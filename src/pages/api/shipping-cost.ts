// pages/api/shipping-cost.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const RAJAONGKIR_API = 'https://api.rajaongkir.com/starter/cost';
const RAJAONGKIR_KEY = process.env.RAJAONGKIR_API_KEY; // Ganti dengan API key yang valid

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validasi method
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      status: {
        code: 405,
        description: "Method Not Allowed"
      }
    });
  }

  // Validasi input
  const { origin, destination, weight, courier } = req.body;
  
  if (!origin || !destination || !weight || !courier) {
    return res.status(400).json({
      status: {
        code: 400,
        description: "Semua field harus diisi"
      }
    });
  }

  try {
    // Format data untuk RajaOngkir
    const formData = new URLSearchParams();
    formData.append('origin', origin);
    formData.append('destination', destination);
    formData.append('weight', weight.toString());
    formData.append('courier', courier.toLowerCase());

    // Kirim request ke RajaOngkir
    const response = await axios({
      method: 'POST',
      url: RAJAONGKIR_API,
      headers: {
        'key': RAJAONGKIR_KEY,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: formData
    });

    // Validasi response dari RajaOngkir
    if (response.data.rajaongkir?.status?.code !== 200) {
      throw new Error(response.data.rajaongkir?.status?.description || 'Gagal mengambil data');
    }

    // Format response sesuai dengan struktur yang diinginkan
    const rajaongkirResponse = {
      rajaongkir: {
        query: {
          origin,
          destination,
          weight,
          courier
        },
        status: response.data.rajaongkir.status,
        origin_details: response.data.rajaongkir.origin_details,
        destination_details: response.data.rajaongkir.destination_details,
        results: response.data.rajaongkir.results
      }
    };

    console.log('RajaOngkir Response:', response.data);
    res.status(200).json(rajaongkirResponse);
  } catch (error: any) {
    console.error('RajaOngkir Error:', error.response?.data || error.message);
    
    const errorResponse = {
      rajaongkir: {
        status: {
          code: error.response?.status || 500,
          description: error.response?.data?.rajaongkir?.status?.description || 
                      error.message || 
                      'Gagal mengambil biaya pengiriman'
        }
      }
    };

    res.status(errorResponse.rajaongkir.status.code).json(errorResponse);
  }
}