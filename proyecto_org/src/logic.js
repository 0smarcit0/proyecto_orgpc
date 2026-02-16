class Memoria {
  constructor() {
    this.datos = { 0x00: 10, 0x01: 5, 0x02: 0, 0x03: 0 };
    this.instrucciones = [
      { op: 'LOAD', dir: 0x00 },
      { op: 'LOAD', dir: 0x01 },
      { op: 'ADD', reg1: 0, reg2: 1 },
      { op: 'STORE', dir: 0x02 },
      { op: 'HALT' }
    ];
    this.pc = 0;
  }

  leerDato(direccion) { return this.datos[direccion] || 0; }
  escribirDato(direccion, valor) { this.datos[direccion] = valor; }
  obtenerInstruccion() { return this.pc < this.instrucciones.length ? this.instrucciones[this.pc] : null; }
  incrementarPC() { this.pc++; }
  reiniciar() { this.datos = { 0x00: 10, 0x01: 5, 0x02: 0, 0x03: 0 }; this.pc = 0; }
}

// =============================
// CLASE CPU
// =============================
class CPU {
  constructor() {
    this.registros = [0, 0, 0, 0];
    this.acumulador = 0;
    this.IR = null;
  }

  cargarRegistro(num, valor) { this.registros[num] = valor; }
  leerRegistro(num) { return this.registros[num]; }
  sumar(r1, r2) { this.acumulador = this.registros[r1] + this.registros[r2]; return this.acumulador; }
  reiniciar() { this.registros = [0, 0, 0, 0]; this.acumulador = 0; }
}

// =============================
// CLASE BUS
// =============================
class Bus {
  constructor() { this.ocupado = false; this.componente = null; }
  adquirir(comp) { 
    if (this.ocupado) { console.log(`⚠️ Bus ocupado - ${comp} espera`); return false; }
    this.ocupado = true; this.componente = comp; console.log(`✓ Bus adquirido por: ${comp}`); return true; 
  }
  liberar() { this.ocupado = false; this.componente = null; }
}

// =============================
// CLASE UNIDAD DE CONTROL
// =============================
class UnidadControl {
  constructor() {
    this.estados = ['INICIO', 'FETCH', 'DECODE', 'FETCH_OP', 'EXECUTE', 'STORE_MEM', 'FIN', 'HALT'];
    this.estado = 'INICIO';
    this.paso = 0;
    this.instruccion = null;
  }

  avanzar() {
    const siguiente = {
      'INICIO': 'FETCH', 'FETCH': 'DECODE', 'DECODE': 'FETCH_OP',
      'FETCH_OP': 'EXECUTE', 'EXECUTE': 'FIN', 'FIN': 'FETCH', 'HALT': 'HALT'
    };
    // Handle STORE and HALT special cases
    if (this.estado === 'EXECUTE' && this.instruccion) {
      if (this.instruccion.op === 'STORE') siguiente['EXECUTE'] = 'STORE_MEM';
      if (this.instruccion.op === 'HALT') siguiente['EXECUTE'] = 'HALT';
    }
    if (this.estado === 'DECODE' && this.instruccion && this.instruccion.op === 'HALT') {
      this.estado = 'HALT';
    } else {
      this.estado = siguiente[this.estado] || 'FIN';
    }
    this.paso++;
  }

  setInstruccion(inst) { this.instruccion = inst; }
  reiniciar() { this.estado = 'INICIO'; this.paso = 0; }
}

// =============================
// SIMULADOR PRINCIPAL
// =============================
class Simulador {
  constructor() {
    this.memoria = new Memoria();
    this.cpu = new CPU();
    this.bus = new Bus();
    this.uc = new UnidadControl();
    this.ejecutando = false;
  }

  iniciar() {
    this.ejecutando = true;
    this.uc.reiniciar();
    this.cpu.reiniciar();
    this.memoria.reiniciar();
    console.log('🚀 SIMULACIÓN INICIADA');
  }

  ejecutarPaso() {
    if (!this.ejecutando) { console.log('❌ No iniciada'); return; }
    
    const est = this.uc.estado;
    console.log(`\n--- Paso ${this.uc.paso + 1}: ${est} ---`);

    switch (est) {
      case 'INICIO': console.log('✓ Sistema listo'); break;
      case 'FETCH':
        if (this.bus.adquirir('CPU')) {
          const inst = this.memoria.obtenerInstruccion();
          this.uc.setInstruccion(inst);
          this.cpu.IR = inst;
          console.log(`📥 CPU obtiene: ${inst.op}`);
          this.bus.liberar();
          this.memoria.incrementarPC();
        }
        break;
      case 'DECODE':
        console.log(`🔍 Decodificando: ${this.uc.instruccion.op}`);
        break;
      case 'FETCH_OP':
        console.log('📦 Obteniendo operandos...');
        if (this.uc.instruccion.op === 'LOAD') {
          if (this.bus.adquirir('CPU')) {
            const val = this.memoria.leerDato(this.uc.instruccion.dir);
            console.log(`↳ Valor: ${val}`);
            this.bus.liberar();
          }
        }
        break;
      case 'EXECUTE':
        console.log('⚙️  Ejecutando...');
        if (this.uc.instruccion.op === 'LOAD') {
          // Load into R0 first time, R1 second time
          const regIndex = this.memoria.pc === 2 ? 1 : 0;
          this.cpu.cargarRegistro(regIndex, this.memoria.leerDato(this.uc.instruccion.dir));
          console.log(`↳ R${regIndex} = ${this.cpu.registros[regIndex]}`);
        } else if (this.uc.instruccion.op === 'ADD') {
          const res = this.cpu.sumar(0, 1);
          console.log(`↳ ${this.cpu.registros[0]} + ${this.cpu.registros[1]} = ${res}`);
        } else if (this.uc.instruccion.op === 'HALT') {
          console.log('🛑 Fin de programa');
        }
        break;
      case 'STORE_MEM':
        if (this.bus.adquirir('CPU')) {
          this.memoria.escribirDato(this.uc.instruccion.dir, this.cpu.acumulador);
          console.log(`💾 Guardado en 0x${this.uc.instruccion.dir.toString(16)}: ${this.cpu.acumulador}`);
          this.bus.liberar();
        }
        break;
      case 'FIN': console.log('✓ Instruccion completada'); break;
      case 'HALT': 
        console.log('🏁 PROGRAMA FINALIZADO'); 
        this.ejecutando = false; 
        break;
    }

    if (this.ejecutando && est !== 'HALT') this.uc.avanzar();
  }
}

// =============================
// EJECUTAR
// =============================
const sim = new Simulador();
sim.iniciar();

// Ejecutar todos los pasos
let pasos = 0;
while (sim.ejecutando && pasos < 20) {
  sim.ejecutarPaso();
  pasos++;
}

console.log('\n=== RESULTADO FINAL ===');
console.log('Registros:', sim.cpu.registros);
console.log('Acumulador:', sim.cpu.acumulador);
console.log('Memoria:', sim.memoria.datos);
console.log('======================');