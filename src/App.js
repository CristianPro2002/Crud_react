import {useState, useEffect} from 'react'
import axios from 'axios'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {


  const baseUrl = "http://localhost:8080/API/";


  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsetar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [dataUsuario, setDataUsuario] = useState({
    id:"",
    name:"",
    email:"",
    city:"",
    country:"",
    job:""
  });

  const peticionGet = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  const peticionPost = async () => {
    var f = new FormData();

    f.append("id", dataUsuario.id);
    f.append("name", dataUsuario.name);
    f.append("email", dataUsuario.email);
    f.append("city", dataUsuario.city);
    f.append("country", dataUsuario.country);
    f.append("job", dataUsuario.job);
    f.append("METHOD", "POST");

    await axios.post(baseUrl, f).then((response)=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    })
  };

  const abrirCerrarModalInsertar = () =>{
setModalInsetar(!modalInsertar);
  };

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setDataUsuario((prevState)=>({
      ...prevState,
      [name]: value
    }));

    console.log(dataUsuario);
  };

  useEffect(() => {
    peticionGet();
  }, [data]);


  return (
    <div>
      <button className='btn btn-success'
      onClick={()=> abrirCerrarModalInsertar()}
      >
        Agregar contacto
      </button>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>City</th>
            <th>Job</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {data.map((Data) =>(
          <tr key={Data.id}>
            <td>{Data.id}</td>
            <td>{Data.name}</td>
            <td>{Data.country}</td>
            <td>{Data.city}</td>
            <td>{Data.job}</td>
            <td>{Data.email}</td>
            <td>
              <button
              className='btn btn-primary'
        /*onClick={()=>seleccionarUsuario(Data, "Editar")}*/
              >
                  Editar
              </button>
              &nbsp;
              <button className='btn btn-danger'
              /*onClick={()=>seleccionarUsuario(Data, "Eliminar")}*/
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))
        }
        </tbody>
      </table>

        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar contacto</ModalHeader>
          <ModalBody>
            <div className='form-group'>
              <label>id:</label>
              <br></br>
              <input type="text"
              className='form-control'
              name='id'
              onChange={handleChange}>
              </input>
              <label>name:</label>
              <br></br>
              <input type="text"
              className='form-control'
              name='name'
              onChange={handleChange}>
              </input>
              <label>country:</label>
              <br></br>
              <input type="text"
              className='form-control'
              name='country'
              onChange={handleChange}>
              </input>
              <label>city:</label>
              <br></br>
              <input type="text"
              className='form-control'
              name='city'
              onChange={handleChange}>
              </input>
              <label>job:</label>
              <br></br>
              <input type="text"
              className='form-control'
              name='job'
              onChange={handleChange}>
              </input>
              <label>email:</label>
              <br></br>
              <input type="text"
              className='form-control'
              name='email'
              onChange={handleChange}>
              </input>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={()=> peticionPost()}>
              Insertar
            </button>
            &nbsp;
            <button className='btn btn-danger'
            onClick={()=> abrirCerrarModalInsertar()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
    </div>
  );
}

export default App;
