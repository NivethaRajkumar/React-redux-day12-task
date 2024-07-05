import { Box, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_PRODUCTS } from '../Redux/Slices/CartSlice';
import Cart from '../Components/Cart';

export default function MyCart() {
    const data = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch()

    //Calculating the subtotal
    const subTotal = data.products.reduce((acc, current) => acc + current.price * (current.quantity || 1), 0);

    //Total discount
    let totalDiscount = data.products.reduce((acc, current) => acc + (current.actualPrice || ((current.quantity || 1) * current.price + (((current.quantity || 1) * current.price) * (current.discountPercentage / 100)))) * (current.quantity || 1), 0)
    totalDiscount = parseInt(totalDiscount - subTotal);

    //Original price
    let originalPrice = parseInt(parseFloat(subTotal) + parseFloat(totalDiscount));

    useEffect(() => {
        dispatch(ADD_PRODUCTS([
            {
                "id": 1,
                "title": "iPhone 9",
                "description": "An apple mobile which is nothing like apple",
                "price": 549,
                "discountPercentage": 12.96,
                "rating": 4.69,
                "stock": 94,
                "brand": "Apple",
                "category": "smartphones",
                "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                "images": [
                        "https://cdn.antaranews.com/cache/1200x800/2017/11/iPhone_X_air.jpg"            
                ]
            },
            {
                "id": 2,
                "title": "iPhone X",
                "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
                "price": 899,
                "discountPercentage": 17.94,
                "rating": 4.44,
                "stock": 34,
                "brand": "Apple",
                "category": "smartphones",
                "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
                "images": [
                    'https://lailai.co.za/wp-content/uploads/2022/08/iPhone-X-Silver.jpg'
                ]
            },
            {
                "id": 3,
                "title": "Samsung Universe 9",
                "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
                "price": 1249,
                "discountPercentage": 15.46,
                "rating": 4.09,
                "stock": 36,
                "brand": "Samsung",
                "category": "smartphones",
                "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
                "images": [
                    'https://i.pcmag.com/imagery/lineupitems/06XOoNmfVNq3SjmByeNZxnz.fit_lim.size_1050x578.v1581384840.jpg'
                ]
            },
            {
                "id": 4,
                "title": "OPPOF19",
                "description": "OPPO F19 is officially announced on April 2021.",
                "price": 280,
                "discountPercentage": 17.91,
                "rating": 4.3,
                "stock": 4,
                "brand": "OPPO",
                "category": "smartphones",
                "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
                "images": [
                    'https://images-eu.ssl-images-amazon.com/images/I/51xvNqTcjzS._AC_UL600_SR600,600_.jpg'
                ]
            },
            {
                "id": 5,
                "title": "Huawei P30",
                "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
                "price": 499,
                "discountPercentage": 10.58,
                "rating": 4.09,
                "stock": 3,
                "brand": "Huawei",
                "category": "smartphones",
                "thumbnail": "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
                "images": [
                    'https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/list-image/phones/p30/P30_black.png'
                ]
            }
        ]))
    }, [])



    return (
        <>
            <Box className="px-8 py-3 box '' md:sticky md:top-0 '' md:z-10 '' md:bg-[#fff]">

                <Box className="flex justify-center items-center my-5 flex-wrap gap-5">
                    <Box className="mr-4 w-[220px] h-[100px] border-2 border-gray-500 p-4 rounded flex justify-center items-center  gap-2">
                        <p className='font-[700]'>Delivery: </p>
                        <p>FREE</p>
                    </Box>
                    <Box className="mr-4 w-[220px] h-[100px]  border-2 border-gray-500 p-4 rounded flex justify-center items-center gap-2">
                        <p className='font-[700]'>Original Total Price</p>
                        <p>$ {originalPrice} </p>
                    </Box>
                    <Box className="mr-4 w-[220px] h-[100px]  border-2 border-gray-500 p-4 rounded flex justify-center items-center gap-2">
                        <p className='font-[700]'>Total Discount price: </p>
                        <p>$ {totalDiscount} </p>
                    </Box>
                    <Box className="mr-4 w-[220px] h-[100px] border-2 border-gray-500 p-4 rounded flex justify-center items-center  gap-2">
                        <p className='font-[700]'>Sub Total (with discount)</p>
                        <p>$ {subTotal}</p>
                    </Box>
                    <Box className="mr-4 w-[220px] h-[100px] border-2 border-gray-500 p-4 rounded flex justify-center items-center  gap-2">
                        <p className='font-[700]'>Total (with discount)</p>
                        <p>$ {subTotal}</p>
                    </Box>
                </Box>
                <h1 className="text-4xl font-[900] my-5">
                    My Cart ({data?.products?.length})
                </h1>
            </Box>
            <Box className='px-8 py-3'>

                <TableContainer>
                    <Table variant="simple" className='h-[10px] overflow-auto w-full'>
                        <Thead>
                            <Tr>
                                <Th className='font-[900]'>Description</Th>
                                <Th className='font-[900]'>Quantity</Th>
                                <Th className='font-[900]'>Remove</Th>
                                <Th className='font-[900]'>Price per quantity</Th>
                                <Th className='font-[900]'>Total Price per quantity</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.products?.length === 0 ? <tr>
                                    <td colSpan="100%">
                                        <p className="flex justify-center p-10">No Products in the cart</p>
                                    </td>
                                </tr> :
                                    data.products.map(product => (
                                        <Cart
                                            product={product}
                                            dispatch={dispatch}
                                            key={product.id}
                                        />
                                    ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>



        </>

    )
}