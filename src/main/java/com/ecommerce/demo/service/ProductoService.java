package com.ecommerce.demo.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.demo.model.Producto;
import com.ecommerce.demo.repository.ProductoRepository;



@Service
public class ProductoService {
	
	@Autowired
	private ProductoRepository productoResporitory;
	
	
	public Producto create (Producto producto) {
		return productoResporitory.save(producto);
	}
	
	public List<Producto> getAllProducto (){
		return productoResporitory.findAll();
	}
	
	public void delete (Producto producto) {
		productoResporitory.delete(producto);
	}
	
	public Optional<Producto> findById (Long id) {
		return productoResporitory.findById(id);
	}
	public Producto update (Producto producto) {
	    if (productoResporitory.findById(producto.getId()).isPresent()) {
	        return productoResporitory.save(producto);
	    }
	    else {
	        // Lanzar una excepción o devolver null si el producto no se encuentra
	        return null;
	    }
	}
	

}