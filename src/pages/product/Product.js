import "./Product.css";
import { Link, useNavigate } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { Publish } from "@mui/icons-material";
import { useSelector} from "react-redux";
import { useState, useMemo, useEffect } from "react";
import {userRequest} from "../../requestMethods";
import {productData} from "../../dummyData"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";
const Product = () => {
  const productId = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
console.log(inputs)

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL};
          updateProduct(productId,product);
        });
      }
    );
    navigate("/products")
  };


  const product = useSelector((state) =>
  state.product.products.find((product) => product._id === productId)
);


  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
        <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock ? <span>true</span>:<span>false</span>}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input name="title" type="text" placeholder={product.title} onChange={handleChange}/>
            <label>Product Description</label>
            <input name="description" type="text" placeholder={product.description} onChange={handleChange}/>
            <label>Product Price</label>
            <input name="price" type="text" placeholder={`${product.price} $`} onChange={handleChange}/>
            <label>In Stock</label>
            <select name="stock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={product.img}
                alt="product img"
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])}/>
            </div>
            <button onClick={handleClick} className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
