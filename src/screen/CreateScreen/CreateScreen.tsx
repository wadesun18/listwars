import {faMinus} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {FieldArray, Formik} from 'formik';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import * as Yup from 'yup';

import CreateItem from '../../component/CreateItem';
import {LIST_COLOR} from '../../constants';
import {useListContext} from '../../context/ListContext';

const TaskFormSchema = Yup.object().shape({
  listTitle: Yup.string().required('List title is required'),
  tasks: Yup.array().of(
    Yup.object().shape({
      taskName: Yup.string().required('Task name is required'),
    }),
  ),
});

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Button = styled.TouchableOpacity`
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: black;
  font-family: 'Montserrat_Regular';
  font-size: 24px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  text-align: center;
  font-weight: 800;
  color: ${LIST_COLOR};
`;

const CreateView = styled.SafeAreaView`
  background-color: #000;
  flex: 1;
`;

const CreateSubheader = styled.Text`
  color: ${LIST_COLOR};
  font-family: Montserrat-SemiBold;
  font-size: 22px;
  text-align: center;
`;

const ItemView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const FormView = styled.View`
  flex: 1;
`;

const TaskOuterContainer = styled.View`
  flex: 1;
`;

// only show trash icon when there is more than one list item

const CreateScreen = ({navigation}: NativeStackHeaderProps) => {
  const {addNewListItem, newListItems} = useListContext();

  const [title, onChangeTitle] = React.useState('Example title text');

  if (!newListItems) return null;
  return (
    <CreateView>
      <Formik
        initialValues={{listTitle: '', tasks: [{taskName: ''}]}}
        validationSchema={TaskFormSchema}
        onSubmit={values => {
          console.log(values);
          alert(values);
          navigation.replace('Home');
        }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => (
          <FormView>
            <ItemView>
              <CreateSubheader>List Title</CreateSubheader>
            </ItemView>
            <ItemView>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('listTitle')}
                onBlur={handleBlur('listTitle')}
                value={values.listTitle}
              />
            </ItemView>
            {errors.listTitle && touched.listTitle ? (
              <Text style={styles.error}>{errors.listTitle}</Text>
            ) : null}

            <FieldArray name="tasks">
              {({push, remove}) => (
                <>
                  <ItemView>
                    <CreateSubheader>
                      <Text>Tasks</Text>
                    </CreateSubheader>
                  </ItemView>
                  <TaskOuterContainer>
                    <FlatList
                      contentContainerStyle={{paddingBottom: 80}}
                      data={values.tasks}
                      keyExtractor={(item, index) => `${index}`}
                      renderItem={({item, index}) => (
                        <>
                          <ItemView>
                            <TextInput
                              style={styles.input}
                              onChangeText={handleChange(
                                `tasks[${index}].taskName`,
                              )}
                              onBlur={handleBlur(`tasks[${index}].taskName`)}
                              value={item.taskName}
                            />
                            <TouchableOpacity
                              onPress={() => remove(index)}
                              style={styles.delete}>
                              <FontAwesomeIcon
                                icon={faMinus}
                                style={{color: LIST_COLOR}}
                                size={26}
                              />
                            </TouchableOpacity>
                          </ItemView>
                          {errors.tasks &&
                          errors.tasks[index] &&
                          touched.tasks &&
                          touched.tasks[index] &&
                          errors.tasks[index].taskName ? (
                            <Text style={styles.error}>
                              {errors.tasks[index].taskName}
                            </Text>
                          ) : null}
                          {index === values.tasks.length - 1 && (
                            <TouchableOpacity
                              onPress={() => push({taskName: ''})}>
                              <FontAwesomeIcon
                                icon={faPlus}
                                style={{color: LIST_COLOR}}
                                size={26}
                              />
                            </TouchableOpacity>
                          )}
                        </>
                      )}
                    />
                  </TaskOuterContainer>
                </>
              )}
            </FieldArray>
            <ButtonContainer>
              <Button onPress={handleSubmit}>
                <ButtonText>Let's go</ButtonText>
              </Button>
            </ButtonContainer>
          </FormView>
        )}
      </Formik>
    </CreateView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  error: {
    color: 'red',
  },
  delete: {
    marginLeft: 10,
  },
});

export default CreateScreen;
