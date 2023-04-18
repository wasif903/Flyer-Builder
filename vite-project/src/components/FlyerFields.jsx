import React, { useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';


function FlyerFields() {
    const [flyers, setFlyers] = useState({
        title: '',
        color: '',
        description: '',
        price: '',
        priceBgColor: '',
        backgroundColor: '',
        image: '',
    });

    const { title, color, description, price, backgroundColor, image, priceBgColor } = flyers;

    const handleOnChange = (e) => {
        setFlyers({ ...flyers, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFlyers({ ...flyers, image: reader.result });
        };
    };

    const onSubmit = () => {
        console.log(flyers);
    };

    const styles = StyleSheet.create({

        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            color: 'black'
        },

        priceBgColor: {
            backgroundColor: 'red',
            width: '20%',
            padding:'30px',
            borderRadius: '100%',
            fontSize:'50px'
        },

        image: {
            marginTop: 10,
            marginBottom: 10,
            maxWidth: 300,
            maxHeight: 300,
        },

    });

    const MyDocument = () => (
        <Document>
            <Page>
                <View style={[{ backgroundColor: backgroundColor, height: '100vh' }]}>

                    <Text style={[{ color: color }]}>Flyer Information</Text>

                    <Text style={[{ color: color }]}>{title}</Text>

                    {image && (
                        <Image
                            src={image}
                            style={styles.image}
                        />
                    )}

                    <Text style={[{ color: color }]}>{description}</Text>

                    <Text style={[styles.priceBgColor, { backgroundColor: priceBgColor, color: color }]}>{price}</Text>


                </View>
            </Page>
        </Document>
    );

    return (
        <>
            <div>
                <div>
                    <input placeholder='title' name='title' type='text' value={title} onChange={handleOnChange} />
                </div>

                <div>
                    <input placeholder='description' name='description' type='text' onChange={handleOnChange} value={description} />
                </div>

                <div>
                    <input placeholder='price' onChange={handleOnChange} name='price' type='number' value={price} />
                </div>

                <div>
                    <label htmlFor="fontColor"> Select Font Color</label>
                    <input placeholder='color' name='color' type='color' onChange={handleOnChange} value={color} />
                </div>

                <div>
                    <label htmlFor="priceBgColor"> Select Price Background Color</label>
                    <input placeholder='price bg color' onChange={handleOnChange} name='priceBgColor' type='color' value={priceBgColor} />
                </div>

                <div>
                    <label htmlFor="backgroundColor"> Select Background Color</label>
                    <input
                        placeholder='background color'
                        onChange={handleOnChange}
                        name='backgroundColor'
                        type='color'
                        value={backgroundColor}
                    />
                </div>

                <div>
                    <input placeholder='image' name='image' type='file' onChange={handleImageChange} />

                </div>

                <PDFDownloadLink document={<MyDocument />} fileName='flyer.pdf'>
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Download PDF'
                    }
                </PDFDownloadLink>
            </div>

        </>
    )
}

export default FlyerFields;