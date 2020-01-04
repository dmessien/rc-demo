import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { IClass } from '../../classes';
import Button from '../Button';
import ImageSelector from '../ImageSelector';
import zIndex from '../../zIndex';
import { MEDIA_QUERY_SMALL } from '../../mediaQueries';
import * as yup from 'yup';

type Props = {
  onCreate: (data: IClass) => void;
  onDismiss: VoidFunction;
};

const FormSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  instructor: yup.string().required('Instructor is required'),
  duration: yup.number().min(1, 'Duration should be at least 1 minute'),
  featuredImage: yup.string().required('Featured image is required'),
  classType: yup.string(),
  id: yup.number(),
});

function ClassForm({ onCreate, onDismiss }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    resetForm,
    dirty,
    setFieldTouched,
    setFieldValue,
    isValid,
    errors,
    touched,
  } = useFormik<IClass>({
    initialValues: {
      title: '',
      description: '',
      instructor: '',
      duration: 1,
      featuredImage: '',
      classType: 'on-demand',
      id: 0,
    },
    validationSchema: FormSchema,
    onSubmit: values => {
      onCreate(values);
      setIsSubmitting(true);
    },
  });

  useEffect(() => {
    if (isSubmitting && dirty) {
      resetForm();
      setIsSubmitting(false);
    }
  }, [isSubmitting, dirty, resetForm]);

  return (
    <Wrapper>
      <TopBar>
        <TransparentButton onClick={onDismiss}>
          <i className="fas fa-times" />
          Close
        </TransparentButton>
        <h3>Create class</h3>
      </TopBar>
      <Form onSubmit={handleSubmit}>
        <HelperText>* = required</HelperText>
        <InputWrapper>
          <label>Title *</label>
          <Input
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            name="title"
            placeholder="i.e - Ribs Revolution"
            required
          />
          {touched.title && <FieldError message={errors.title} />}
        </InputWrapper>
        <InputWrapper>
          <label>Instructor *</label>
          <Input
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.instructor}
            name="instructor"
            placeholder="Who's teaching?"
            required
          />
          {touched.instructor && <FieldError message={errors.instructor} />}
        </InputWrapper>
        <InputWrapper>
          <TextArea
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.description}
            name="description"
            placeholder="Description (required)"
          />
          {touched.description && <FieldError message={errors.description} />}
        </InputWrapper>
        <InputWrapper>
          <label>Duration (mins)</label>
          <Input
            type="number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.duration}
            name="duration"
            min="1"
            placeholder="Duration"
            required
          />
          <FieldError message={errors.duration} />
        </InputWrapper>
        <InputWrapper>
          <label>Class type</label>
          <Select
            onBlur={handleBlur}
            onChange={handleChange}
            name="classType"
            value={values.classType}
          >
            <option value="on-demand">On Demand</option>
            <option value="live">Live</option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <div>
            <label>Featured Image *</label>
          </div>
          <ImageSelector
            onSelect={(url: string) => {
              setFieldTouched('featuredImage', true);
              setFieldValue('featuredImage', url);
            }}
          />
          {values.featuredImage.length > 0 && (
            <ImagePreview src={values.featuredImage} alt="Preview" />
          )}
          {touched.featuredImage && (
            <FieldError message={errors.featuredImage} />
          )}
        </InputWrapper>
        <SubmitButton disabled={!dirty || !isValid}>Submit</SubmitButton>
      </Form>
    </Wrapper>
  );
}

export default ClassForm;

const FieldError = ({ message }: { message?: string }) => {
  if (message) {
    return <ErrorMessage>{message}</ErrorMessage>;
  }
  return null;
};

const Form = styled.form``;

const TopBar = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 30%;
  height: 100vh;
  padding: 25px 25px 50px;
  background-color: #1174ff;
  color: #ffffff;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;

  @media ${MEDIA_QUERY_SMALL} {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${zIndex.sidebar};
  }
`;

const Input = styled.input`
  border: none;
  border-bottom: solid 1px #ffffff;
`;
const TextArea = styled.textarea`
  min-height: 100px;
  resize: none;
  border: solid 1px #ffffff;
`;
const Select = styled.select`
  padding: 25px 15px;
  background: transparent;
  border: solid 1px #ffffff;
  width: 100%;
  font-size: 1.1rem;
  color: #ffffff;
  margin-top: 10px;
`;

const InputWrapper = styled.div`
  padding: 10px 0;
  ${Input},
  ${TextArea} {
    width: 100%;
    padding: 15px;
    font-size: 1.1rem;
    background: transparent;
    outline: none;
    color: #ffffff;
    font-weight: 400;
    ::placeholder {
      color: rgba(255, 255, 255, 0.75);
    }
    &:hover {
      outline: none;
    }
  }

  label {
    color: #ffffff;
    font-weight: 600;
  }
`;

const TransparentButton = styled(Button)`
  background: transparent;
  color: #ffffff;
  &:hover {
    background-color: rgba(255, 255, 255, 0.35);
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
  font-weight: 500;
  &:disabled {
    opacity: 0.65;
    pointer-events: none;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: #ee2949;
  padding: 10px 15px;
  margin: 10px 0;
  background-color: #ffc2f2;
`;

const HelperText = styled.h6`
  font-weight: 400;
  font-style: italic;
  margin: 25px 0 15px;
`;
