import React, { useState, useCallback, useEffect } from 'react';
import Input from '../../Ui/Input';
import Modal from '../../Ui/Modal/Modal';
import styled from 'styled-components';
import { VscClose } from 'react-icons/vsc';
import axios from 'axios';
import PropTypes from 'prop-types';

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 1rem;
`;

const ItemsContainer = styled.ul`
  padding-top: 1rem;
  margin-top: 1rem;
  height: 30vh;
  overflow-y: scroll;
  box-sizing: border-box;
`;

const Items = styled.li`
  margin-bottom: 1rem;
  font-weight: 300;
`;

const AddressSearch = ({ onSelect, onClose }) => {
  const [addressQuery, setAddressQuery] = useState('');
  const [tmpAddressQuery, setTmpAddressQuery] = useState(addressQuery);
  const [addressData, setAddressData] = useState([]);

  const onChangeAddressQuery = useCallback((event) => {
    setTmpAddressQuery(event.target.value);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      return setAddressQuery(tmpAddressQuery);
    }, 300);

    return () => clearTimeout(debounce);
  }, [tmpAddressQuery]);

  useEffect(() => {
    const requestAddressSearch = async () => {
      const response = await axios.get(
        `api/map/search?address=${encodeURIComponent(addressQuery)}`
      );

      setAddressData(response.data.searchResultList);
    };
    if (!!addressQuery) {
      requestAddressSearch();
    } else {
      setAddressData([]);
    }
  }, [addressQuery]);
  return (
    <>
      <Modal style={{ width: '50vw' }}>
        <Header>
          <VscClose onClick={onClose} size={24}></VscClose>
        </Header>
        <section>
          <Input
            type="text"
            placeholder="주소를 검색해주세요."
            value={tmpAddressQuery}
            onChange={onChangeAddressQuery}
          />
          <ItemsContainer>
            {addressData.map((address) => (
              <Items
                key={address.address}
                onClick={onSelect.bind(this, address)}
              >
                {address.address}
              </Items>
            ))}
            {!!addressQuery && !addressData.length && (
              <Items>검색된 주소가 없습니다.</Items>
            )}
          </ItemsContainer>
        </section>
      </Modal>
    </>
  );
};

AddressSearch.propTypes = {
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

export default AddressSearch;
