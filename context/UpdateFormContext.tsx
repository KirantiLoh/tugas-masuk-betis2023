import UpdateBreadForm from 'components/UpdateBreadForm';
import { Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react'
import { useContext } from 'react';
import { ReactNode } from 'react';

interface IUpdateFormContext {
    showForm: boolean
    setShowForm: Dispatch<SetStateAction<boolean>>
    breadDetail: IBread
    setBreadDetail: Dispatch<SetStateAction<IBread>>
}

const UpdateFormContext = createContext<IUpdateFormContext>({
    showForm: false,
    setShowForm: undefined as unknown as Dispatch<SetStateAction<boolean>>,
    breadDetail: {} as unknown as IBread,
    setBreadDetail: undefined as unknown as Dispatch<SetStateAction<IBread>>,
});

export const UpdateFormProvider = ({children}: {children: ReactNode}) => {
  
    const [showForm, setShowForm] = useState(false);
    const [breadDetail, setBreadDetail] = useState<IBread>({
        id: -1,
        name: "",
        expired_date: "",
        description: "",
        image: "",
        owner: -1,
    });
    
    const contextValue = {
        showForm: showForm,
        setShowForm: setShowForm,
        breadDetail: breadDetail,
        setBreadDetail: setBreadDetail,
    }

    return (
      <UpdateFormContext.Provider value={contextValue}>
        <UpdateBreadForm />
        {children}
      </UpdateFormContext.Provider>
    );
}

export const useUpdateForm = () => useContext(UpdateFormContext);
