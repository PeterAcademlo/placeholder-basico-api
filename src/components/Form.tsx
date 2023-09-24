import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Typography } from 'antd';

const { Title } = Typography;

const FormikForm = () => {
    return (
        <div className="registration-form">
            <Title className="registration-form__title">Formulario:</Title>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '' }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Debe tener 15 caracteres o menos')
                        .required('Obligatorio'),
                    lastName: Yup.string()
                        .max(20, 'Debe tener 20 caracteres o menos')
                        .required('Obligatorio'),
                    email: Yup.string().email('Dirección inválida').required('Requerido'),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        resetForm();
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
                        <label htmlFor="lastName" className="registration-form__label">Apellido:</label>
                        <Field name="lastName" type="text" className="registration-form__input" />
                        <ErrorMessage name="lastName" component="div" className="registration-form__error" />
                    </div>

                    <div className="registration-form__field">
                        <label htmlFor="email" className="registration-form__label">Correo electrónico:</label>
                        <Field name="email" type="email" className="registration-form__input" />
                        <ErrorMessage name="email" component="div" className="registration-form__error" />
                    </div>

                    <div className="registration-form__field">
                        <></>
                        <button type="submit" className="registration-form__submit-button">Enviar</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default FormikForm;
