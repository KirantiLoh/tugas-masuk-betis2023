import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { FaTimes } from "react-icons/fa"
import { useOverlay } from "context/OverlayContext";
import axios from "axios";
import { useRef } from 'react';
import { useRefetch } from "context/RefetchContext";
import { useToast } from 'context/ToastContext';
interface CreateBreadFormProps {
  showForm: boolean
  setShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateBreadForm = ({showForm, setShowForm}: CreateBreadFormProps) => {
 
    const { setShowOverlay } = useOverlay();

    const { setRefetch } = useRefetch();

    const { setShowToast, setMessage, setType } = useToast();

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
      
      if (!name || !description || !image || !expiredDate) return;
      
      try {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("expired_date", expiredDate);

        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roti/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        
        setName("");
        setDescription("");
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        setExpiredDate("");
        setRefetch(true);
        setType("success");
        setMessage("Roti berhasil ditambahkan!");
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

    const handleClose = () => {
      setShowOverlay(false);
      setName("");
      setDescription("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setExpiredDate("");
      setShowForm(false);
    }

  return (
    <form
      onSubmit={handleSubmit}
      className={`my-2 p-5 z-10 rounded-lg ${showForm ? "scale-100" : "scale-0"} transition-all duration-500 flex flex-col gap-2 fixed center min-w-[300px] bg-white`}
    >
      <div className="flex items-center justify-between text-2xl">
        <h1 className="text-center font-semibold">Tambahkan Roti</h1>
        <FaTimes className='cursor-pointer' onClick={() => {
          handleClose()
        }} />
      </div>
      <label htmlFor="name">Name (60 characters)</label>
      <input 
        className='input'
        type="text" id="name" value={name} onChange={e => {
            setName(e.target.value.slice(0, 60));
        }} 
      />
      <label htmlFor="description">Description (60 characters)</label>
      <textarea 
        className='input'
        id='description' value={description} onChange={e => {
            setDescription(e.target.value.slice(0, 60))
        }} cols={30} rows={3}
      ></textarea>
      <label htmlFor="expired_date">Expired Date</label>
      <input 
        className='input'
        type="date" id="expired_date" value={expiredDate} onChange={e => setExpiredDate(e.target.value)} 
      />
      <label htmlFor="image">Photo</label>
      <input 
        className='input'
        ref={fileInputRef}
        onChange={handleChange}
        type="file" id="image" accept='image/*' 
      />
      <button disabled={loading || !name || !description || !image || !expiredDate} className='button primary mt-3'>Tambahkan Roti</button>
    </form>
  );
}

export default CreateBreadForm;