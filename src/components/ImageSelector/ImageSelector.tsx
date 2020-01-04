import React, { useState, useEffect, useCallback, useReducer } from 'react';
import Modal from '../Modal';
import styled from 'styled-components';
import Button from '../Button';
import useDebounce from '../../hooks/useDebounce';

const PER_PAGE = 15;
const CLIENT_ID =
  '08d41998665cdd316a2acc2b6914d5d36840204477db412e81622ce90fea21e0';

type ImageData = {
  urls: {
    regular: string;
  };
  alt_description: string;
};

type SearchResponse = {
  total: number;
  total_pages: number;
  results: ImageData[];
};

type SearchRequestInit = {
  type: 'SEARCH_REQUEST_INIT';
};

type SearchRequestSuccess = {
  type: 'SEARCH_REQUEST_SUCCESS';
  payload: SearchResponse;
};

type SearchRequestLoadMore = {
  type: 'LOAD_MORE_REQUEST';
};

type SearchReset = {
  type: 'SEARCH_RESET';
};

type Action =
  | SearchRequestInit
  | SearchRequestSuccess
  | SearchRequestLoadMore
  | SearchReset;

type State = {
  page: number;
  totalPages: number;
  results: ImageData[];
  isLoading: boolean;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SEARCH_REQUEST_INIT':
      return {
        ...state,
        isLoading: true,
      };
    case 'SEARCH_REQUEST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        results:
          state.page === 1
            ? action.payload.results
            : [...state.results, ...action.payload.results],
        totalPages: action.payload.total_pages,
      };
    case 'LOAD_MORE_REQUEST':
      return {
        ...state,
        isLoading: true,
        page: state.page + 1,
      };
    case 'SEARCH_RESET':
      return {
        ...state,
        isLoading: false,
        page: 1,
        totalPages: 1,
        results: [],
      };
    default:
      return state;
  }
}

type Props = {
  onSelect: (url: string) => void;
};

function ImageSelector({ onSelect }: Props) {
  const [state, dispatch] = useReducer(reducer, {
    page: 1,
    totalPages: 0,
    results: [],
    isLoading: false,
  });

  const [text, setText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const debouncedText = useDebounce(text, 500);

  useEffect(() => {
    if (state.page === 1) {
      dispatch({ type: 'SEARCH_RESET' });
    }
  }, [text, state.page]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const selectImage = useCallback(
    (url: string) => {
      setShowModal(false);
      setText('');
      dispatch({ type: 'SEARCH_RESET' });
      onSelect(url);
    },
    [dispatch, onSelect]
  );

  useEffect(() => {
    if (debouncedText.length > 0) {
      dispatch({ type: 'SEARCH_REQUEST_INIT' });

      fetch(
        `https://api.unsplash.com/search/photos?page=${state.page}&per_page=${PER_PAGE}&query=${debouncedText}&client_id=${CLIENT_ID}`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((res: SearchResponse) => {
          // Aggregate results data if beyond page 1 for load more effect
          // if (page > 1) {
          //   aggregateResults(res.results);
          // }
          // setResults(res.results);
          // setTotalPages(res.total_pages);
          dispatch({
            type: 'SEARCH_REQUEST_SUCCESS',
            payload: res,
          });
        });
    }
  }, [debouncedText, state.page]);

  if (!showModal) {
    return (
      <ToggleButton onClick={() => setShowModal(true)}>
        Select an image
      </ToggleButton>
    );
  }

  return (
    <Modal title="Image selector" onDismiss={() => setShowModal(false)}>
      <Wrapper>
        <InputWrapper>
          <input
            type="text"
            onChange={handleChange}
            value={text}
            placeholder="Search for image"
          />
        </InputWrapper>
      </Wrapper>
      <GridWrapper>
        <Results>
          {state.isLoading && state.page >= state.totalPages && (
            <i className="fas fa-circle-notch fa-spin fa-3x fa-fw" />
          )}
          {state.results.map(({ urls, alt_description }) => (
            <ImageWrapper onClick={() => selectImage(urls.regular)}>
              <img src={urls.regular} alt={alt_description} />
            </ImageWrapper>
          ))}
          {state.page < state.totalPages && (
            <LoadMoreButton
              onClick={() => dispatch({ type: 'LOAD_MORE_REQUEST' })}
            >
              {state.isLoading ? (
                <i className="fas fa-circle-notch fa-spin fa-3x fa-fw" />
              ) : (
                <p>Load more</p>
              )}
            </LoadMoreButton>
          )}
        </Results>
      </GridWrapper>
    </Modal>
  );
}

export default ImageSelector;

const ToggleButton = styled(Button)`
  background-color: transparent;
  color: #ffffff;
  transition: color 0.25s ease-in-out;
  width: 100%;
  margin: 10px 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const Wrapper = styled.div`
  padding: 25px;
`;

const InputWrapper = styled.div`
  padding: 10px 0;
  input,
  textarea {
    width: 100%;
    padding: 15px;
    font-size: 1.1rem;
    border: solid 1px #222222;
    outline: none;
    font-weight: 400;
    &:hover {
      outline: none;
    }
  }
`;

const GridWrapper = styled.div`
  height: 400px;
  overflow-y: scroll;
`;

const Results = styled.div`
  display: grid;
  min-width: 320px;
  max-width: 400px;
  margin: 0 auto;
  flex-flow: row wrap;
  align-content: space-around;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 113px;
  overflow: hidden;
  opacity: 0.75;
  cursor: pointer;
  transition: opacity 0.25s linear;
  img {
    width: 100%;
  }
  &:hover {
    opacity: 1;
    border: solid 2px #1174ff;
  }
`;

const LoadMoreButton = styled.div`
  width: 200px;
  height: 113px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.25s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;
