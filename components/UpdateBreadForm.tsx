import { FormEvent, useEffect, useState, ChangeEvent } from 'react';
import { FaTimes } from "react-icons/fa"
import { useOverlay } from "context/OverlayContext";
import { useUpdateForm } from 'context/UpdateFormContext';
import Image from 'next/image';
import { useRef } from 'react';
import { useRefetch } from "context/RefetchContext";
import axios from 'axios';
import { useToast } from 'context/ToastContext';

const UpdateBreadForm = () => {

    const { showForm, setShowForm, breadDetail, setBreadDetail } = useUpdateForm();

    const { setShowOverlay } = useOverlay();

    const { setShowToast, setMessage, setType } = useToast();

    const { setRefetch } = useRefetch();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [expiredDate, setExpiredDate] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      files && setImage(files[0])
    }

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      if (
        name === breadDetail.name &&
        description === breadDetail.description &&
        expiredDate === breadDetail.expired_date &&
        !image
      ) return;
      
      try {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        image && formData.append("image", image);
        formData.append("expired_date", expiredDate);

        const res = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roti/${breadDetail.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        
        setName("");
        setDescription("");
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setExpiredDate("");
        setType("success");
        setMessage("Roti berhasil diubah!");
        setRefetch(true);
      }
      catch (err) {
        console.log(err);
        setType("error");
        setMessage("Ada error :(");
      }
      finally {
        setLoading(false);
        setShowToast(true);
        handleClose();
      }
    }

    const deleteBread = async () => {
      try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roti/${breadDetail.id}`);
        setName("");
        setDescription("");
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        setExpiredDate("");
        setType("warning");
        setMessage("Roti dihapus");
        setRefetch(true);
      }
      catch (err) {
        console.log(err);
        setType("error");
        setMessage("Ada error :(");
      }
      finally {
        setShowToast(true);
        handleClose();
      }
    }

    const handleClose = () => {
      setShowOverlay(false);
      setName("");
      setDescription("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      setExpiredDate("");
      setShowForm(false);
    }


    useEffect(() => {
        setName(breadDetail.name);
        setDescription(breadDetail.description);
        setExpiredDate(breadDetail.expired_date);
    }, [breadDetail])

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-h-screen overflow-y-auto p-5 z-10 rounded-lg ${showForm ? "scale-100" : "scale-0"} transition-all duration-500 flex flex-col gap-2 fixed center min-w-[300px] bg-white`}
    >
      <div className="flex items-center justify-between text-2xl">
        <h1 className="text-center font-semibold">Detail Roti</h1>
        <FaTimes className='cursor-pointer' onClick={() => {
          setShowForm(false)
          setShowOverlay(false)
        }} />
      </div>
      <label htmlFor="name">Name (60 Characters)</label>
      <input 
        className='input'
        type="text" id="name" value={name} onChange={e => setName(e.target.value.slice(0,60))} 
      />
      <label htmlFor="description">Description (60 Characters)</label>
      <textarea 
        className='input resize-none'
        id='description' value={description} onChange={e => setDescription(e.target.value.slice(0,60))} cols={30} rows={3}
      ></textarea>
      <label htmlFor="expired_date">Expired Date</label>
      <input 
        className='input'
        type="date" id="expired_date" value={expiredDate} onChange={e => setExpiredDate(e.target.value)} 
      />
      <label htmlFor="image">Photo</label>
      <div className="relative w-full min-h-[150px] rounded overflow-hidden">
        <Image src={breadDetail.image || "/background.jpg"} alt={name} fill className='object-cover' />
      </div>
      <input 
        className='input min-h-[50px]'
        ref={fileInputRef}
        onChange={handleChange}
        type="file" id="image" accept='image/*' 
      />
      <button 
        className='button primary mt-3'
        disabled={
          name === breadDetail.name &&
          description === breadDetail.description &&
          expiredDate === breadDetail.expired_date &&
          !image
        }
      >Ubah</button>
      <button className='button' onClick={() => deleteBread()}>Hapus</button>
    </form>
  );
}

export default UpdateBreadForm;