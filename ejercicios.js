const EJERCICIOS = [
  {
    id: 1,
    titulo: "01_variables.py",
    instrucciones: `# Variables en Python
Asigna los siguientes valores:
- \`nombre\` = tu nombre (string)
- \`edad\` = tu edad (entero)
- \`altura\` = tu altura en metros (float)`,
    boilerplate: `# Completa las variables
nombre = ___
edad = ___
altura = ___`,
    testCode: `
assert isinstance(nombre, str), "❌ 'nombre' debe ser un string"
assert isinstance(edad, int), "❌ 'edad' debe ser un entero"
assert isinstance(altura, float), "❌ 'altura' debe ser un float"
print("✅ ¡Correcto! Variables asignadas correctamente")
`
  },
  {
    id: 2,
    titulo: "02_strings.py",
    instrucciones: `# Strings
- Crea \`saludo\` que contenga "Hola, mundo"
- Crea \`mayusculas\` con \`saludo\` en mayúsculas
- Crea \`longitud\` con el número de caracteres de \`saludo\``,
    boilerplate: `saludo = ___
mayusculas = ___
longitud = ___`,
    testCode: `
assert saludo == "Hola, mundo", "❌ 'saludo' debe ser 'Hola, mundo'"
assert mayusculas == "HOLA, MUNDO", "❌ Usa .upper()"
assert longitud == 11, "❌ Usa len()"
print("✅ ¡Correcto! Strings dominados")
`
  },
  {
    id: 3,
    titulo: "03_numbers.py",
    instrucciones: `# Números
- \`suma\` = 15 + 27
- \`division\` = 10 / 4  (float)
- \`modulo\` = 17 % 5
- \`potencia\` = 2 ** 8`,
    boilerplate: `suma = ___
division = ___
modulo = ___
potencia = ___`,
    testCode: `
assert suma == 42, "❌ suma debe ser 42"
assert division == 2.5, "❌ division debe ser 2.5"
assert modulo == 2, "❌ modulo debe ser 2"
assert potencia == 256, "❌ potencia debe ser 256"
print("✅ ¡Correcto! Operadores numéricos dominados")
`
  },
  {
    id: 4,
    titulo: "04_if_else.py",
    instrucciones: `# Condicionales
Dado \`temperatura = 35\`, asigna a \`estado\`:
- "calor" si temperatura > 30
- "templado" si entre 15 y 30
- "frio" si menor a 15`,
    boilerplate: `temperatura = 35
estado = ___`,
    testCode: `
assert estado == "calor", "❌ Con 35 grados el estado debe ser 'calor'"
print("✅ ¡Correcto! Condicionales funcionando")
`
  },
  {
    id: 5,
    titulo: "05_comparadores.py",
    instrucciones: `# Comparadores
Asigna booleanos usando comparaciones:
- \`es_mayor\` = ¿es 10 mayor que 5?
- \`es_igual\` = ¿es "python" igual a "Python"?
- \`es_distinto\` = ¿es 7 distinto de 7.0?`,
    boilerplate: `es_mayor = ___
es_igual = ___
es_distinto = ___`,
    testCode: `
assert es_mayor == True, "❌ 10 > 5 es True"
assert es_igual == False, "❌ Cuidado con mayúsculas"
assert es_distinto == False, "❌ 7 == 7.0 en Python"
print("✅ ¡Correcto! Comparadores dominados")
`
  },
  {
    id: 6,
    titulo: "06_and_or.py",
    instrucciones: `# Operadores lógicos
- \`resultado1\` = True AND False
- \`resultado2\` = True OR False  
- \`resultado3\` = NOT True
- \`resultado4\` = (5 > 3) AND (10 < 20)`,
    boilerplate: `resultado1 = ___
resultado2 = ___
resultado3 = ___
resultado4 = ___`,
    testCode: `
assert resultado1 == False, "❌ True and False = False"
assert resultado2 == True, "❌ True or False = True"
assert resultado3 == False, "❌ not True = False"
assert resultado4 == True, "❌ Ambas condiciones son verdaderas"
print("✅ ¡Correcto! Lógica booleana dominada")
`
  },
  {
    id: 7,
    titulo: "07_for.py",
    instrucciones: `# Bucle for
Usa un bucle \`for\` para sumar todos los números del 1 al 10.
Guarda el resultado en \`total\`.`,
    boilerplate: `total = 0
# Tu bucle aquí
___`,
    testCode: `
assert total == 55, "❌ La suma de 1 a 10 es 55"
print("✅ ¡Correcto! Bucle for dominado")
`
  },
  {
    id: 8,
    titulo: "08_while.py",
    instrucciones: `# Bucle while
Usando \`while\`, multiplica \`contador\` por 2 mientras sea menor a 100.
\`contador\` empieza en 1.`,
    boilerplate: `contador = 1
# Tu bucle aquí
___`,
    testCode: `
assert contador == 128, "❌ 1→2→4→8→16→32→64→128"
print("✅ ¡Correcto! Bucle while dominado")
`
  },
  {
    id: 9,
    titulo: "09_range.py",
    instrucciones: `# range()
- \`pares\` = lista de números pares del 0 al 20 (inclusive) usando range
- \`invertido\` = lista [10, 8, 6, 4, 2] usando range`,
    boilerplate: `pares = list(___)
invertido = list(___)`,
    testCode: `
assert pares == [0,2,4,6,8,10,12,14,16,18,20], "❌ range(0, 21, 2)"
assert invertido == [10,8,6,4,2], "❌ range(10, 1, -2)"
print("✅ ¡Correcto! range() dominado")
`
  },
  {
    id: 10,
    titulo: "10_listas.py",
    instrucciones: `# Listas
Dada \`frutas = ["manzana", "pera", "uva"]\`:
- Añade "mango" al final
- Elimina "pera"
- Guarda la longitud final en \`total\``,
    boilerplate: `frutas = ["manzana", "pera", "uva"]
# Modifica la lista
___
total = ___`,
    testCode: `
assert "mango" in frutas, "❌ Usa .append()"
assert "pera" not in frutas, "❌ Usa .remove()"
assert total == 3, "❌ Deben quedar 3 frutas"
print("✅ ¡Correcto! Listas dominadas")
`
  },
  {
    id: 11,
    titulo: "11_slicing.py",
    instrucciones: `# Slicing
Dada \`nums = [0,1,2,3,4,5,6,7,8,9]\`:
- \`primeros\` = primeros 3 elementos
- \`ultimos\` = últimos 3 elementos
- \`inversa\` = lista completa invertida`,
    boilerplate: `nums = [0,1,2,3,4,5,6,7,8,9]
primeros = ___
ultimos = ___
inversa = ___`,
    testCode: `
assert primeros == [0,1,2], "❌ nums[:3]"
assert ultimos == [7,8,9], "❌ nums[-3:]"
assert inversa == [9,8,7,6,5,4,3,2,1,0], "❌ nums[::-1]"
print("✅ ¡Correcto! Slicing dominado")
`
  },
  {
    id: 12,
    titulo: "12_metodos_lista.py",
    instrucciones: `# Métodos de lista
Dada \`numeros = [3,1,4,1,5,9,2,6]\`:
- \`ordenada\` = lista ordenada (sin modificar original)
- \`maximo\` = valor máximo
- \`cuenta_unos\` = cuántos 1 hay`,
    boilerplate: `numeros = [3,1,4,1,5,9,2,6]
ordenada = ___
maximo = ___
cuenta_unos = ___`,
    testCode: `
assert ordenada == [1,1,2,3,4,5,6,9], "❌ Usa sorted()"
assert maximo == 9, "❌ Usa max()"
assert cuenta_unos == 2, "❌ Usa .count()"
print("✅ ¡Correcto! Métodos de lista dominados")
`
  },
  {
    id: 13,
    titulo: "13_dicts.py",
    instrucciones: `# Diccionarios
Crea \`persona\` con claves: \`nombre\` (string), \`edad\` (int), \`ciudad\` (string).
Luego añade la clave \`activo\` con valor \`True\`.`,
    boilerplate: `persona = ___
# Añade 'activo'
___`,
    testCode: `
assert isinstance(persona, dict), "❌ persona debe ser un dict"
assert "nombre" in persona, "❌ Falta clave 'nombre'"
assert "edad" in persona, "❌ Falta clave 'edad'"
assert "ciudad" in persona, "❌ Falta clave 'ciudad'"
assert persona.get("activo") == True, "❌ Falta clave 'activo': True"
print("✅ ¡Correcto! Diccionarios dominados")
`
  },
  {
    id: 14,
    titulo: "14_dict_acceso.py",
    instrucciones: `# Acceso a diccionarios
Dado el dict \`datos\`, extrae:
- \`nombre\` = valor de la clave "nombre"
- \`telefono\` = valor de "telefono", o "N/A" si no existe`,
    boilerplate: `datos = {"nombre": "Ana", "edad": 28}
nombre = ___
telefono = ___`,
    testCode: `
assert nombre == "Ana", "❌ Accede con datos['nombre']"
assert telefono == "N/A", "❌ Usa .get() con valor por defecto"
print("✅ ¡Correcto! Acceso a dicts dominado")
`
  },
  {
    id: 15,
    titulo: "15_dict_iteracion.py",
    instrucciones: `# Iteración de diccionarios
Dado \`precios\`, crea \`total\` sumando todos los valores.
Crea \`productos\` con la lista de todas las claves.`,
    boilerplate: `precios = {"manzana": 1.5, "pan": 0.8, "leche": 1.2}
total = ___
productos = ___`,
    testCode: `
assert round(total, 1) == 3.5, "❌ Suma todos los valores"
assert sorted(productos) == ["leche", "manzana", "pan"], "❌ Usa .keys()"
print("✅ ¡Correcto! Iteración de dicts dominada")
`
  },
  {
    id: 16,
    titulo: "16_funciones.py",
    instrucciones: `# Funciones
Define \`saludar(nombre)\` que retorne "Hola, {nombre}!".
Define \`cuadrado(n)\` que retorne n².`,
    boilerplate: `def saludar(___):
    ___

def cuadrado(___):
    ___`,
    testCode: `
assert saludar("Ana") == "Hola, Ana!", "❌ Revisa el formato del string"
assert cuadrado(5) == 25, "❌ Retorna n**2"
assert cuadrado(0) == 0, "❌ Caso borde: 0²=0"
print("✅ ¡Correcto! Funciones dominadas")
`
  },
  {
    id: 17,
    titulo: "17_args_kwargs.py",
    instrucciones: `# Argumentos
Define \`presentar(nombre, edad, ciudad="Desconocida")\` 
que retorne: "Me llamo {nombre}, tengo {edad} años y soy de {ciudad}".`,
    boilerplate: `def presentar(___):
    ___`,
    testCode: `
assert presentar("Luis", 30) == "Me llamo Luis, tengo 30 años y soy de Desconocida", "❌ Revisa el valor por defecto"
assert presentar("Ana", 25, "Madrid") == "Me llamo Ana, tengo 25 años y soy de Madrid", "❌ Revisa el formato"
print("✅ ¡Correcto! Argumentos dominados")
`
  },
  {
    id: 18,
    titulo: "18_try_except.py",
    instrucciones: `# Try/Except
Define \`dividir(a, b)\` que:
- Retorne a/b si b != 0
- Retorne "Error: división por cero" si b == 0`,
    boilerplate: `def dividir(a, b):
    ___`,
    testCode: `
assert dividir(10, 2) == 5.0, "❌ División normal"
assert dividir(9, 3) == 3.0, "❌ División normal"
assert dividir(5, 0) == "Error: división por cero", "❌ Captura ZeroDivisionError"
print("✅ ¡Correcto! Try/Except dominado")
`
  },
  {
    id: 19,
    titulo: "19_raise.py",
    instrucciones: `# Raise
Define \`validar_edad(edad)\` que:
- Retorne "Válido" si 0 <= edad <= 120
- Lance \`ValueError("Edad fuera de rango")\` en caso contrario`,
    boilerplate: `def validar_edad(edad):
    ___`,
    testCode: `
assert validar_edad(25) == "Válido", "❌ 25 es válido"
assert validar_edad(0) == "Válido", "❌ 0 es válido"
try:
    validar_edad(-1)
    assert False, "❌ Debe lanzar ValueError"
except ValueError as e:
    assert str(e) == "Edad fuera de rango", "❌ Mensaje incorrecto"
print("✅ ¡Correcto! raise dominado")
`
  },
  {
    id: 20,
    titulo: "20_clases.py",
    instrucciones: `# Clases
Crea la clase \`Rectangulo\` con:
- Constructor: \`ancho\` y \`alto\`
- Método \`area()\` → retorna ancho * alto
- Método \`perimetro()\` → retorna 2 * (ancho + alto)`,
    boilerplate: `class Rectangulo:
    def __init__(self, ___):
        ___
    
    def area(self):
        ___
    
    def perimetro(self):
        ___`,
    testCode: `
r = Rectangulo(4, 5)
assert r.area() == 20, "❌ area = ancho * alto"
assert r.perimetro() == 18, "❌ perimetro = 2*(ancho+alto)"
r2 = Rectangulo(3, 3)
assert r2.area() == 9, "❌ Cuadrado: 3*3=9"
print("✅ ¡Correcto! Clases dominadas")
`
  }
];

window.EJERCICIOS = EJERCICIOS;
