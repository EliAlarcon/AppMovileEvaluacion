import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'

interface Product {
    name: string,
    price: number
}

export const ProductCardComponent = () => {
    const products = [
        {
            name: 'mouse',
            price: 50
        },
        {
            name: 'laptop',
            price: 1500
        },
        {
            name: 'teclado',
            price: 80
        },
        {
            name: 'monitor',
            price: 120
        }
    ];

    const valorTotalProductos = (products: Product[]): number =>{
        return products.reduce((acumulador, producto)=>acumulador+producto.price,0);
    }

    const valorTotal = valorTotalProductos(products);

  return (
    <View style={styles.container} >
        {products.map((product, index)=>{
            const {name, price} = product;
            return(
                <View style={styles.product} >
                    <Text variant='titleLarge'>Nombre: {name} </Text>
                    <Text variant='bodyLarge'>Precio: {price}</Text>
                </View>
            );
        })}
        <View style={styles.total} >
            <Text variant='headlineLarge'>Valor Total {valorTotal} </Text>
        </View>
    </View>
  )
}
