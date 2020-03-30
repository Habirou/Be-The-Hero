import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
const navigation = useNavigation();
const route = useRoute();

const incident = route.params.incident;
const message = `Bonjour ${incident.name} on a certaians services a vous proposer au ${incident.title} seulement a ${Intl.NumberFormat((pt-BR) , {style: 'currency' , currency: 'BRL'}).format(incident.value)} `;

function navigationBack() {
    navigation.goBack()
}

function sendMail() {
    MailComposer.composeAsync({
        subject: `Heroi de caso: ${incident.title}`,
        recipients: [incident.email],
        body: message,
    })
}

function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
}

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity  onPress={navigationBack}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>
                    
                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat((pt-BR) , {
                                style: 'currency' , 
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>
                </View>

                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia</Text>
                    <Text style= {styles.heroTitle}>Seja o heroi desse caso</Text>

                    <Text style={styles.heroDescription}>Entre em contacto</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>Whatsapp</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>Email</Text>
                        </TouchableOpacity>
                    </View>
                </View>

        </View>
    );
}