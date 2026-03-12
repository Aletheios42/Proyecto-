# 🐍 Python Cheat Sheet - Proyecto Ñ

Esta guía rápida contiene todo lo necesario para resolver los 20 ejercicios del curso.

---

## 1. Variables y Tipos de Datos
```python
nombre = "Zelda"       # String (texto)
edad = 25              # Int (entero)
altura = 1.75          # Float (decimal)
es_pro = True          # Boolean (True o False)

```

## 2. Operadores Matemáticos

| Operador | Acción | Ejemplo |
| --- | --- | --- |
| `+` | Suma | `5 + 2` |
| `-` | Resta | `10 - 3` |
| `*` | Multiplicación | `4 * 2` |
| `/` | División (float) | `10 / 4 # 2.5` |
| `%` | Módulo (Resto) | `7 % 2 # 1` |
| `**` | Potencia | `2 ** 3 # 8` |

## 3. Cadenas de Texto (Strings)

```python
texto = "Hola Mundo"

# Métodos útiles
texto.upper()      # "HOLA MUNDO"
texto.lower()      # "hola mundo"
len(texto)         # 10 (cuenta caracteres)

# F-Strings (Formateo)
mensaje = f"Hola, {nombre}" 

```

## 4. Listas (Arrays)

```python
frutas = ["manzana", "pera", "uva"]

frutas.append("mango")    # Añade al final
frutas.remove("pera")      # Elimina por valor
frutas[0]                  # "manzana" (primer elemento)

# Slicing (Cortes)
numeros = [0, 1, 2, 3, 4, 5]
numeros[0:3]               # [0, 1, 2]
numeros[-1]                # 5 (último elemento)
numeros[::-1]              # [5, 4, 3, 2, 1, 0] (invertir)

```

## 5. Diccionarios

```python
persona = {"nombre": "Juan", "edad": 30}

persona["ciudad"] = "Madrid" # Añadir clave-valor
print(persona["nombre"])      # Acceder
persona.get("tel", "N/A")    # Acceso seguro (si no existe devuelve N/A)

```

## 6. Control de Flujo

```python
# Condicionales
if edad >= 18:
    print("Mayor de edad")
elif edad > 13:
    print("Adolescente")
else:
    print("Niño")

# Bucles
for i in range(5):          # Repite 5 veces (0 a 4)
    print(i)

while contador < 10:        # Repite mientras sea verdad
    contador += 1

```

## 7. Funciones y Errores

```python
# Definición
def saludar(nombre="Amigo"):
    return f"Hola {nombre}"

# Manejo de errores
try:
    resultado = 10 / 0
except ZeroDivisionError:
    print("No se puede dividir por cero")

# Lanzar error manualmente
raise ValueError("Dato no permitido")

```

## 8. Clases (POO)

```python
class Rectangulo:
    def __init__(self, ancho, alto):
        self.ancho = ancho
        self.alto = alto

    def area(self):
        return self.ancho * self.alto

```
