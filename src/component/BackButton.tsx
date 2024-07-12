import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LIST_COLOR } from '../constants';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CustomBackButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ color: LIST_COLOR }}
                size={32}
            />
        </TouchableOpacity>
    );
};

export default CustomBackButton;
