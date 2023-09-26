import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Typography, Table, Carousel, Button, message, Modal } from 'antd';
import eliminar from '../imgs/trash-solid-24.png';
import agregar from '../imgs/sticker-regular-24.png';

const { Title, Text } = Typography;

interface FormData {
    id: number;
    firstName: string;
    user: string;
    email: string;
}

interface RecordData {
    id: number;
    firstName: string;
    user: string;
    email: string;
}

const FormikForm = () => {
    const [formData, setFormData] = useState<FormData[]>([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);

    useEffect(() => {
    }, []);

    const latestEntry: FormData | null = formData.length > 0 ? formData[formData.length - 1] : null;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Usuario',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (record: RecordData) => (
                <span>
                    <button
                        className='registration-form__table-button'
                        type="button"
                        onClick={() => handleDelete(record.id)}
                    >
                        <img className='registration-form__table-button-delete' src={eliminar} alt="Eliminar" />
                    </button>
                </span>
            ),
        },
    ];

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleDelete = (id: number) => {
        const updatedData = formData.filter((entry) => entry.id !== id);
        setFormData(updatedData);
        message.success('Dato eliminado exitosamente');
    };

    const handleShowFormModal = () => {
        setShowFormModal(true);
    };

    const handleCloseFormModal = () => {
        setShowFormModal(false);
    };

    return (
        <div className="registration-form">
            {latestEntry && (
                <div className='new-user'>
                    <div className='new-user__list'>
                        <Title className="new-user__title" style={{ color: '#fff' }}>Nuevos Usuarios:</Title>
                        <Carousel autoplay className="new-user__carousel">
                            <div className="new-user__carousel-group">
                                <div className="new-user__carousel-item">
                                    <Text className="new-user__text">
                                        <span className="new-user__id">{latestEntry.id}.</span>
                                        <span className="new-user__name">{latestEntry.user}</span>
                                        <Button
                                            className="new-user__button"
                                            onClick={toggleDetails}
                                        >
                                            Ver Detalles
                                        </Button>
                                    </Text>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                    {showDetails && (
                        <div className="registration-form__table-container">
                            <Title className="registration-form__title" style={{ color: '#fff' }}>Detalles de los nuevos Usuarios:</Title>
                            <Table
                                className="registration-form__table"
                                columns={columns}
                                dataSource={formData}
                                pagination={false}
                            />
                            <Button onClick={toggleDetails} className="registration-form__button">
                                Ver Menos
                            </Button>
                        </div>
                    )}
                </div>
            )}

            <Button
                type="primary"
                size="large"
                className="custom-button"
                style={{ borderRadius: '5px' }}
                onClick={handleShowFormModal}
            >
                <img className='registration-form__table-button-add' src={agregar} alt="agregar" />
                agregar
            </Button>

            <Modal
                visible={showFormModal}
                onCancel={handleCloseFormModal}
                footer={null}
            >
                <div className="registration-form__form-container">
                    <Title className="registration-form__title">Formulario:</Title>
                    <Formik
                        initialValues={{ firstName: '', user: '', email: '' }}
                        validationSchema={Yup.object({
                            firstName: Yup.string()
                                .max(15, 'Debe tener 15 caracteres o menos')
                                .required('Obligatorio'),
                            user: Yup.string()
                                .max(20, 'Debe tener 20 caracteres o menos')
                                .required('Obligatorio'),
                            email: Yup.string().email('Dirección inválida').required('Requerido'),
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setTimeout(() => {
                                const newEntry = { ...values, id: formData.length + 1 };
                                const newData = [...formData, newEntry];
                                setFormData(newData);
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                                resetForm();
                                handleCloseFormModal();
                            }, 300);
                        }}
                    >
                        <Form className="registration-form__form">
                            <div className="registration-form__field">
                                <label htmlFor="firstName" className="registration-form__label">Nombre:</label>
                                <Field name="firstName" type="text" className="registration-form__input" />
                                <ErrorMessage name="firstName" component="div" className="registration-form__error" />
                            </div>

                            <div className="registration-form__field">
                                <label htmlFor="user" className="registration-form__label">Usuario:</label>
                                <Field name="user" type="text" className="registration-form__input" />
                                <ErrorMessage name="user" component="div" className="registration-form__error" />
                            </div>

                            <div className="registration-form__field">
                                <label htmlFor="email" className="registration-form__label">Correo electrónico:</label>
                                <Field name="email" type="email" className="registration-form__input" />
                                <ErrorMessage name="email" component="div" className="registration-form__error" />
                            </div>

                            <div className="registration-form__field">
                                <button type="submit" className="registration-form__submit-button">Enviar</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </Modal>
        </div>
    );
};

export default FormikForm;
