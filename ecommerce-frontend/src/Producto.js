import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";

export default function Producto() {
  const [editingProducto, setEditingProducto] = useState(null);
  const [productos, setProductos] = useState([]);
  const [newProducto, setNewProducto] = useState({
    codigoEan: "",
    nombreDelProducto: "",
    descripcionDelProducto: "",
    marcaArtesania: "",unidadesDisponibles:"",
     imagenProducto:""
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/producto/")
      .then(response => setProductos(response.data))
      .catch(error => console.log(error));
  }, []);

  const addProducto = () => {
    axios.post("http://localhost:8080/api/producto/", newProducto)
      .then(() => {
        // Actualizar los productos desde el backend
        axios.get("http://localhost:8080/api/producto/")
          .then(response => setProductos(response.data))
          .catch(error => console.log(error));
  
        setNewProducto({
          codigoEan: "",
          nombreDelProducto: "",
          descripcionDelProducto: "",
          marcaArtesania: "",
        });
      })
      .catch(error => console.log(error));
  };
  
  const deleteProducto = (id) => {
    axios.delete(`http://localhost:8080/api/producto/${id}`)
        .then(() => {
            setProductos(productos.filter(producto => producto.id !== id));
        })
        .catch(error => console.log(error));
};
const updateProducto = (id, updatedProducto) => {
  axios.put(`http://localhost:8080/api/producto/${id}`, updatedProducto)
      .then(response => {
          setProductos(productos.map(producto => 
              producto.id === id ? response.data : producto
          ));
          setEditingProducto(null);  // Cerrar el formulario de edición
      })
      .catch(error => console.log(error));
};



  return (
    <Container 
            fluid 
            style={{ 
                backgroundImage: `url(${process.env.PUBLIC_URL}/fondo.jpg)`, 
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                minHeight: '100vh'
            }}>
          
            <Row>
        <Col>
          <h1>Productos</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Código EAN"
                value={newProducto.codigoEan}
                onChange={(e) => setNewProducto({ ...newProducto, codigoEan: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nombre del Producto"
                value={newProducto.nombreDelProducto}
                onChange={(e) => setNewProducto({ ...newProducto, nombreDelProducto: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Descripción del Producto"
                value={newProducto.descripcionDelProducto}
                onChange={(e) => setNewProducto({ ...newProducto, descripcionDelProducto: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Marca"
                value={newProducto.marcaArtesania}
                onChange={(e) => setNewProducto({ ...newProducto, marcaArtesania: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Unidades Disponibles"
                value={newProducto.unidadesDisponibles}
                onChange={(e) => setNewProducto({ ...newProducto, unidadesDisponibles: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={addProducto}>Agregar Producto</Button>
          </Form>
        </Col>
       <Col>
      {productos.map((producto, index) => (
          <Card key={index} className="mb-3">
            <Card.Header>{producto.nombreDelProducto}</Card.Header>
            <Card.Body>

              <Card.Text>
                {producto.descripcionDelProducto}
              </Card.Text>
              <Card.Text>
                Código EAN: {producto.codigoEan}
              </Card.Text>
              <Card.Text>
                Marca: {producto.marcaArtesania}
              </Card.Text>
              <Card.Text>
                U.Disponibles: {producto.unidadesDisponibles}
              </Card.Text>
              
              <Button variant="info" onClick={() => setEditingProducto(producto)}>Editar</Button>
              <Button variant="danger" onClick={() => deleteProducto(producto.id)}>Eliminar</Button>

              {editingProducto?.id === producto.id && (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre del Producto</Form.Label>
                      <Form.Control 
                          type="text" 
                          value={editingProducto.nombreDelProducto} 
                          onChange={e => setEditingProducto({...editingProducto, nombreDelProducto: e.target.value})}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Código EAN</Form.Label>
                      <Form.Control 
                          type="number" 
                          value={editingProducto.codigoEan} 
                          onChange={e => setEditingProducto({...editingProducto, codigoEan: e.target.value})}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Descripción del Producto</Form.Label>
                      <Form.Control 
                          type="text" 
                          value={editingProducto.descripcionDelProducto} 
                          onChange={e => setEditingProducto({...editingProducto, descripcionDelProducto: e.target.value})}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Marca</Form.Label>
                      <Form.Control 
                          type="text" 
                          value={editingProducto.marcaArtesania} 
                          onChange={e => setEditingProducto({...editingProducto, marcaArtesania: e.target.value})}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>U.Disponibles</Form.Label>
                      <Form.Control 
                          type="number" 
                          value={editingProducto.unidadesDisponibles} 
                          onChange={e => setEditingProducto({...editingProducto, unidadesDisponibles: e.target.value})}
                      />
                    </Form.Group>
                    <Button variant="success" onClick={() => updateProducto(producto.id, editingProducto)}>Guardar Cambios</Button>
                    <Button variant="secondary" onClick={() => setEditingProducto(null)}>Cancelar</Button>
                  </Form>
              )}

            </Card.Body>
          </Card>
        ))}
      </Col>
    </Row>
  </Container>
);
  
    
}

