import React, { useEffect } from 'react'
import { DECREMENT, INCREMENT, REMOVE } from '../Redux/Slices/CartSlice'
import { Box, IconButton, Image, Input, Td, Tooltip, Tr } from '@chakra-ui/react'
import { CloseIcon, MinusIcon, SmallAddIcon } from '@chakra-ui/icons'
import { Carousel } from 'react-responsive-carousel'

export default function Cart({ product, dispatch }) {

    return (
        <>
            <Tr>
                <Td className="flex items-center gap-5">
                    <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay width={100}  showArrows={false} showStatus={false} >
                        {product.images.map((image, index) => (
                            <div key={index}>
                                <Image
                                    boxSize={'100px'}
                                    src={image}
                                    alt={`${product.title} ${index + 1}`}
                                />
                            </div>
                        ))}
                    </Carousel>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col flex-wrap'>
                            <div className='flex gap-3 items-center'>
                                <h1 className='text-[20px] font-bold'>{product.title}</h1>
                                <small>({product.discountPercentage}% OFF)</small>

                            </div>
                            <p className='text-xl mt-2'>{product.stock < 5 && <small className='text-red-500'>* Only {product.stock} pieces left </small>}</p>

                        </div>
                        <Tooltip label={product.description}>
                            <p className='w-[500px] overflow-hidden text-ellipsis whitespace-nowrap'>{product.description}</p>
                        </Tooltip>

                    </div>
                </Td>
                <Td>
                    <Box className="flex items-center flex-col gap-3">
                        <div className='flex items-center'>
                            <IconButton
                                isRound={true}
                                variant='outline'
                                colorScheme='blue'
                                icon={<MinusIcon />}
                                className='mr-2'
                                fontSize={'12px'}
                                size={'sm'}
                                onClick={() => dispatch(DECREMENT({ id: product.id }))}
                            />

                            <Input size="sm" width="50px" value={product.quantity || 1} readOnly />
                            <IconButton
                                isRound={true}
                                variant='outline'
                                colorScheme='blue'
                                icon={<SmallAddIcon />}
                                className='ml-2'
                                size={'sm'}
                                onClick={() => dispatch(INCREMENT({ id: product.id }))}
                            />
                            {/* <Button size="sm" colorScheme='twitter' className="ml-2" >
                                +
                            </Button> */}
                        </div>

                        {
                            product.isOutOfStock && <small className='text-[red]'>* Out of stock</small>
                        }
                    </Box>
                </Td>
                <Td>
                    <IconButton icon={<CloseIcon />} isRound size="sm" colorScheme='pink' variant={'outline'} fontSize={'10px'} onClick={() => dispatch(REMOVE({ id: product.id }))} />
                </Td>
                <Td>
                    <h1 className='flex gap-2 text-[15px] font-[800]'>
                        $ {product.price}
                    </h1>

                </Td>
                <Td>
                    <div className='flex gap-2 flex-wrap text-[15px] font-[800]'>
                        $ {product.price * (product.quantity || 1)}
                        <small className='line-through'>${product.actualPrice || ((product.quantity || 1) * product.price + (((product.quantity || 1) * product.price) * (product.discountPercentage / 100))).toFixed(2)}</small>
                    </div>
                </Td>

            </Tr>

        </>
    )
}