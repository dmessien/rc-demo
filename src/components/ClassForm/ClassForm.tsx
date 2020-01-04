import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { IClass } from '../../classes';
import Button from '../Button';
import ImageSelector from '../ImageSelector';
import zIndex from '../../zIndex';
import { MEDIA_QUERY_SMALL } from '../../mediaQueries';

type Props = {
  onCreate: (data: IClass) => void;
  onDismiss: VoidFunction;
};

function ClassForm({ onCreate, onDismiss }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    handleChange,
    values,
    resetForm,
    dirty,
    setFieldValue,
  } = useFormik<IClass>({
    initialValues: {
      title: '',
      description: '',
      instructor: '',
      duration: 0,
      featuredImage: '',
      classType: 'on-demand',
      id: 0,
    },
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
        <InputWrapper>
          <Input
            type="text"
            onChange={handleChange}
            value={values.title}
            name="title"
            placeholder="Title"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            onChange={handleChange}
            value={values.instructor}
            name="instructor"
            placeholder="Instructor"
          />
        </InputWrapper>
        <InputWrapper>
          <TextArea
            onChange={handleChange}
            value={values.description}
            name="description"
            placeholder="Description"
          />
        </InputWrapper>
        <InputWrapper>
          <label>Duration (mins)</label>
          <Input
            type="number"
            onChange={handleChange}
            value={values.duration}
            name="duration"
            placeholder="Duration"
          />
        </InputWrapper>
        <InputWrapper>
          <label>Class type</label>
          <Select
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
            <label>Featured Image</label>
          </div>
          <ImageSelector
            onSelect={(url: string) => setFieldValue('featuredImage', url)}
          />
          {values.featuredImage.length > 0 && (
            <ImagePreview src={values.featuredImage} alt="Preview" />
          )}
        </InputWrapper>
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Wrapper>
  );
}

export default ClassForm;

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
  padding: 50px 25px;
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

const Input = styled.input``;
const TextArea = styled.textarea`
  min-height: 175px;
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
    border: none;
    border-bottom: solid 1px #ffffff;
    outline: none;
    color: #ffffff;
    font-weight: 400;
    ::placeholder {
      color: #ffffff;
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
`;

const ImagePreview = styled.img`
  width: 100%;
`;
