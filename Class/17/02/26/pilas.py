class Stack:


# Lo que hace el code es definir una clase llamada Stack que implementa 
# una estructura de datos de pila (stack) utilizando una lista en Python.
#  La clase tiene métodos para verificar si la pila está vacía,
#  agregar elementos a la pila (push), eliminar el elemento superior de 
# la pila (pop), obtener el elemento superior sin eliminarlo (top) y imprimir
#  el contenido de la pila (print_stack).
    
    def __init__(self):
        self.items = []
        
    def is_empty(self):
        return len(self.items) == 0
        
    def push(self, item):
        self.items.append(item)
        
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
            
    def top(self):
        if not self.is_empty():
            return self.items[-1]
            
    def print_stack(self):
        print(self.items)


# Este code define una función llamada reverse_string que toma una
#  cadena de texto como entrada y devuelve la cadena invertida 
def reverse_string(string):
    stack = Stack()
    final_string = ''
    
    for char in string:
        stack.push(char)
        
    while not stack.is_empty():
        final_string += stack.pop()
        
    return final_string

print(reverse_string('jhonatan'))