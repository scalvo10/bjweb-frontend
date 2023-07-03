import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Crea una instancia de axios
const createAxiosInstance = (token) => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    (config) => {
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;