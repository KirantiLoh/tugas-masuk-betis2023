import { useAuth } from "context/AuthContext";
import { useSideNav } from 'context/SideNavContext';
import { HiMenuAlt1, HiPlus } from "react-icons/hi";
import axios from "axios";
import BreadCard from "components/BreadCard";
import CreateBreadForm from "components/CreateBreadForm";
import { useEffect, useState } from "react";
import { useOverlay } from "context/OverlayContext";
import { useRefetch } from "context/RefetchContext";
// import { formatDate } from "utils/formatDate";
// import { withAuth } from "hoc/withAuth";

interface HomeProps {
  breads: IBread[] | []
}

const Home = ({breads}: HomeProps) => {

  const { setShow } = useSideNav();

  const { setShowOverlay } = useOverlay();

  const { user } = useAuth();

  const { refetch, setRefetch } = useRefetch();

  const [showForm, setShowForm] = useState(false);
  const [breadList, setBreadList] = useState(breads || []);
  
  const getBread = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roti/`);
    
      const data: IGetRotiResponse = await res.data;
    
      setBreadList(data.data);
  
    }
    catch (err) {
      console.log(err);
      setBreadList(breadList);
    }
    finally {
      setRefetch(false);
    }
  }

  useEffect(() => {
    if (refetch) {
      getBread();
    }
  }, [refetch])

  return (
      <section className="w-full h-full overflow-y-auto p-2 flex flex-col gap-3">
        <div className="">
          <div 
            onClick={() => setShow(prev => !prev)}
            className="cursor-pointer block sm:hidden text-3xl"
          >
            <HiMenuAlt1 />
          </div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Selamat Datang {user.first_name ? user.first_name : user.username}
          </h1>
        </div>
        <hr className="shadow" />
        <aside className="p-3 ">
          <h2 className="pb-3 text-2xl font-semibold">List Roti</h2>
          <ul className="grid grid-cols-dynamic gap-3">
            {breadList.length > 0 ?
              breadList.map((bread, index) => {
                return (
                  <BreadCard key={index} {...bread} />
                )
              })
              :
              <div>
                Anda tak punya roti :C
              </div>
            }
          </ul>
        </aside>
        <button onClick={() => {
          setShowForm(true)
          setShowOverlay(true)
        }} className="fixed bottom-3 right-3 w-14 h-14 text-4xl grid place-items-center bg-yellow-700 text-white rounded-full">
          <HiPlus />
        </button>
        <CreateBreadForm showForm={showForm} setShowForm={setShowForm} />
      </section>
  )
}

export default Home;
// export default withAuth(Home);

export const getServerSideProps = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roti`);
  
    const data: IGetRotiResponse = await res.data;
  
    console.log(data.data);

    return {
      props: {
        breads: data.data,
      }
    }

  }
  catch (err) {
    console.log(err);
    return {
      props: {
        breads: [],
      }
    }
  }
}