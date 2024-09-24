import { Form } from "react-bootstrap";
import "./CreateLockStyle.css";
import { ChangeEvent, useState } from "react";
import { CreateLock} from '../../services/https/lock';
import { message } from "antd";


const createLock = () => {
    const [values, setValues] = useState({
        id: '',
        status: 'ว่าง',
        price: 0,
        size: ''
    });

    
    // handle input changes
    const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // แปลงค่าของ price จาก string เป็น number
        setValues({
            ...values,
            [name]: name === "price" ? parseFloat(value) : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(values);
    
        try {
            // เรียกใช้ CreateLock API
            const response = await CreateLock(values);
            if (response?.error) {
                // ตรวจสอบว่าข้อผิดพลาดเป็นเรื่อง ID มีอยู่แล้วหรือไม่
                if (response.error === 'ล็อคนี้มีอยู่แล้ว') {
                    message.error('ID นี้มีอยู่แล้วในระบบ');
                } else {
                    message.error(response.error || 'ไม่สามารถสร้างล็อคได้');
                }
            } else {
                message.success('ล็อคถูกสร้างเรียบร้อยแล้ว');
                setTimeout(() => {
                    window.location.reload();   
                }, 500);  // รอ 500 มิลลิวินาทีก่อนโหลดหน้าใหม่
            }
        } catch (error) {
            console.error('Error creating lock:', error);
            message.error('เกิดข้อผิดพลาดในการสร้างล็อค');
        }
    };
    
    

    return (
        <div className="createform">
            <h1></h1>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="id">ชื่อล็อค</label>
                <input
                    type="text"
                    placeholder="Enter Lock Id"
                    name="id"
                    onChange={handleChanges}
                    required
                />

                <label htmlFor="price">สถานะ</label>
                <input
                    type="text"
                    placeholder="Enter Status"
                    name="status"
                    onChange={handleChanges}
                    required
                />


                <label htmlFor="price">ราคา</label>
                <input
                    type="text"
                    placeholder="Enter Price"
                    name="price"
                    onChange={handleChanges}
                    required
                />

                <label htmlFor="size">ขนาด</label>
                <input
                    type="text"
                    placeholder="Enter Size"
                    name="size"
                    onChange={handleChanges}
                    required
                />

                <button className = "reset" type="reset">Reset</button>
                <button className = "SummitCreate" type="submit">Submit</button>
            </Form>
        </div>
    );
};

export default createLock;
