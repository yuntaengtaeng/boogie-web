import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useGetCategory = (code) => {
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get(`api/category/${code}`);
        setCategorys(response.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          return;
        }

        alert(error.message);
      }
    };

    if (!!code) {
      getCategory();
    }
  }, [code]);

  return categorys;
};

export default useGetCategory;
