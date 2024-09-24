import axios from "axios";
import { LocksInterface } from "../../interfaces/ILock";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");

const requestOptions = {

  headers: {

    "Content-Type": "application/json",

    Authorization: `${Bearer} ${Authorization}`,

  },

};

async function GetLocks() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/locks`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}




async function DeleteLockByID(id: string | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/locks/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return true;
      } else {
        return false;
      }
    });

  return res;
}

async function GetLockById(id: string | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/locks/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}


async function CreateLock(data: LocksInterface) {
  try {
      const response = await axios.post(`${apiUrl}/locks`, data, requestOptions);
      return response.data;  // คืนค่าเฉพาะข้อมูลที่สำคัญจาก Response
  } catch (error) {
      // ตรวจสอบว่า error มี response หรือไม่ และคืนค่าเป็นข้อมูลที่เข้าใจได้
      if (axios.isAxiosError(error) && error.response) {
          return { error: error.response.data.error || 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์' }; // คืนค่า error จาก API
      }
      return { error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' }; // กรณีอื่น ๆ
  }
}


async function UpdateLock(data: LocksInterface) {
  if (!data.id) {
    throw new Error('ID is missing');
  }

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${apiUrl}/locks/${data.id}`, requestOptions);
    if (response.ok) {
      return true;
    } else {
      console.error('Failed to update lock:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error updating lock:', error);
    return false;
  }
}

async function UpdateLocksById(id: string, data: LocksInterface) {

  return await axios

    .put(`${apiUrl}/locks/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function UpdateStatus() {
  try {
    // แก้ไขค่าตามสถานะที่ต้องการเคลียร์และสถานะใหม่
    const response = await axios.post(`${apiUrl}/clear-status`, {
      statusToClear: 'ไม่ว่าง', // ใช้ค่าจริงที่ต้องการเคลียร์
      newStatus: 'ว่าง' // ใช้ค่าจริงที่ต้องการเปลี่ยนเป็น
    });
    return response.status === 200;
  } catch (error) {
    console.error('Error clearing status:', error);
    throw error;
  }
}

async function GetTotalShops() {
  try {
    const response = await axios.get(`${apiUrl}/api/count-shops`, requestOptions);
    return response.data.totalShops;
  } catch (error) {
    console.error('Error fetching total shops:', error);
    throw error;
  }
}

async function GetTotalUsers() {
  try {
    const response = await axios.get(`${apiUrl}/api/count-users`, requestOptions);
    return response.data.totalUsers;
  } catch (error) {
    console.error('Error fetching total users:', error);
    throw error;
  }
}
async function GetTotalReservationsPrice() {
  try {
    const response = await axios.get(`${apiUrl}/api/sum-reservations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching total reservations price:', error);
    throw error;
  }
}

async function GetDashboardData() {
  try {
    const response = await axios.get(`${apiUrl}/api/dashboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to load dashboard data.');
  }
}


async function UpdateLockStatus(id: string, newStatus: string): Promise<boolean> {
  try {
    // ส่งคำขอ PATCH เพื่ออัปเดตสถานะของล็อค
    const response = await axios.put(`${apiUrl}/locks/${id}/update`, {
      Status: newStatus,
    });

    if (response.status === 200) {
      return true; // สำเร็จ
    } else {
      return false; // ไม่สำเร็จ
    }
  } catch (error) {
    console.error('Error updating lock status:', error);
    return false;
  }
}


export {
  GetLocks,
  CreateLock,
  DeleteLockByID,
  GetLockById,
  UpdateLock,
  UpdateLocksById,
  UpdateStatus,
  GetTotalShops,
  GetTotalUsers,
  GetTotalReservationsPrice,
  GetDashboardData,
  UpdateLockStatus
};