import React from "react";
import { useState, useEffect } from "react";
//import axios from "axios";
import * as yup from "yup";
import "./SiparisFormu.css";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const SiparisFormu = (props) => {
  let { price } = props;

  const [count, setCount] = useState(1);
  const decrease = () => {
    setCount(count - 1);
  };
  const increase = () => {
    setCount(count + 1);
  };
  console.log(count);

  const initialForm = {
    size: { Küçük: false, Orta: false, Büyük: false },
    thickness: {
      "Hamur Kalınlığı": false,
      İnce: false,
      Normal: false,
      Kalın: false,
    },
    extraIngredients: {
      Pepperoni: false,
      Domates: false,
      Biber: false,
      Sosis: false,
      Mısır: false,
      Sucuk: false,
      "Kanada Jambonu": false,
      Mantar: false,
      Ananas: false,
      "Tavuk Izgara": false,
      Jalepeno: false,
      Kabak: false,
      Soğan: false,
      Sarımsak: false,
    },
    note: "",
    quantity: count,
  };

  /* const initialError = {
    size: "",
    thickness: "",
  }; */

  const [formData, setFormData] = useState(initialForm);
  //const [errors, setErrors] = useState(initialError);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  let numberOfIngredients = 0;
  for (let key in formData.extraIngredients) {
    if (formData.extraIngredients[key] === true) {
      numberOfIngredients++;
    }
  }

  const newPrice = (price) => {
    if (
      formData.size !== "Küçük" &&
      formData.size !== "Orta" &&
      formData.size !== "Büyük"
    ) {
      return (price -= price);
    } else if (formData.size === "Küçük") {
      return price;
    } else if (formData.size === "Orta") {
      return (price += 10);
    } else if (formData.size === "Büyük") {
      return (price += 20);
    }
  };

  const formSchema = yup.object().shape({
    size: yup
      .object()
      .shape({
        Küçük: yup.boolean(),
        Orta: yup.boolean(),
        Büyük: yup.boolean(),
      })
      .test(
        "Sadece birini seçiniz.",
        (value) => (Object.values(value).filter(Boolean).length = 1)
      ),

    thickness: yup
      .object()
      .shape({
        "Hamur Kalınlığı": yup.boolean(),
        İnce: yup.boolean(),
        Normal: yup.boolean(),
        Kalın: yup.boolean(),
      })
      .test(
        "Sadece birini seçebilirsiniz.",
        (value) => (Object.values(value).filter(Boolean).length = 1)
      ),
    extraIngredients: yup
      .object()
      .shape({
        Pepperoni: yup.boolean(),
        Domates: yup.boolean(),
        Biber: yup.boolean(),
        Sosis: yup.boolean(),
        Mısır: yup.boolean(),
        Sucuk: yup.boolean(),
        "Kanada Jambonu": yup.boolean(),
        Mantar: yup.boolean(),
        "Tavuk Izgara": yup.boolean(),
        Jalepeno: yup.boolean(),
        Kabak: yup.boolean(),
        Soğan: yup.boolean(),
        Sarımsak: yup.boolean(),
      })
      /* .test("En fazla 10 malzeme seçebilirsiniz.", numberOfIngredients <= 10), */
      .test(
        "En fazla 10 malzeme seçebilirsiniz.",
        (value) => Object.values(value).filter(Boolean).length <= 10
      ),
  });

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setIsDisabled(valid));
  }, [formData]);

  const changeHandler = (event) => {
    let name = event.target.name;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    let newFormData = {
      ...formData,
      [name]: value,
    };

    if (event.target.type === "checkbox") {
      newFormData = {
        ...formData,
        extraIngredients: { ...formData.extraIngredients, [name]: value },
      };
    } else {
      newFormData = {
        ...formData,
        [name]: value,
      };
    }

    console.log(newFormData);

    setFormData(newFormData);

    /*  yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        const newErrors = { ...errors, [name]: "" };
        setErrors(newErrors);
      })
      .catch((error) => {
        const newErrors = { ...errors, [name]: error.errors[0] };
        setErrors(newErrors);
      }); */
  };

  const submitHandler = (event) => {
    event.preventDefault();
    /*  axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        props.addNewUser(res.data);
      })
      // props.users
      .catch((error) => {
        console.log(error.response.message);
      }); */
    const orderData = {
      pizzaName: "Position Absolute Acı Pizza",
      size: formData.size,
      thickness: formData.thickness,
      extraIngredients: formData.extraIngredients,
      totalPrice: count * (numberOfIngredients * 5 + newPrice(price)),
    };
    history.push("/siparisalindi", orderData);
    setFormData(initialForm);
  };

  return (
    <form id="pizza-form" onSubmit={submitHandler}>
      <div className="size-thickness-options">
        <div className="size">
          <p className="titles">Boyut Seç</p>
          <span>*</span>
          <div className="size-options">
            <div className="size-option">
              <input
                id="küçük"
                name="size"
                type="radio"
                value="Küçük"
                ckecked={formData.size === "Küçük"}
                onChange={changeHandler}
              />
              <label htmlFor="küçük">Küçük</label>
            </div>
            <div className="size-option">
              <input
                id="orta"
                name="size"
                type="radio"
                value="Orta"
                checked={formData.size === "Orta"}
                onChange={changeHandler}
              />
              <label htmlFor="orta">Orta</label>
            </div>
            <div className="size-option">
              <input
                id="büyük"
                name="size"
                type="radio"
                value="Büyük"
                checked={formData.size === "Büyük"}
                onChange={changeHandler}
              />
              <label htmlFor="büyük">Büyük</label>
            </div>
          </div>
        </div>
        <div className="thickness">
          <p className="titles">Hamur Seç</p>
          <span>*</span>
          <div className="thickness-options" onChange={changeHandler}>
            <select onChange={changeHandler} name="thickness" id="thickness">
              <option value="">Hamur kalınlığı</option>
              <option selected={formData.thickness === "İnce"} value="İnce">
                İnce
              </option>
              <option selected={formData.thickness === "Normal"} value="Normal">
                Normal
              </option>
              <option selected={formData.thickness === "Kalın"} value="Kalın">
                Kalın
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="extra-ingredients-container">
        <p className="titles">Ek Malzemeler</p>
        <p className="extra-ingredients-details">
          En fazla 10 malzeme seçebilirsiniz.5₺
        </p>
        <div className="extra-ingredients">
          {Object.keys(formData.extraIngredients).map((item, index) => (
            <div className="checkbox-input-label">
              <input
                id={item}
                name={item}
                type="checkbox"
                checked={formData.extraIngredients.item}
                onChange={changeHandler}
              ></input>
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="order-note-container">
        <p className="titles">Sipariş Notu</p>
        <textarea
          id="orderNote"
          name="orderNote"
          placeholder="Siparişine eklemek istediğin bir not var mı ?"
          onChange={changeHandler}
        ></textarea>
      </div>

      <div className="counter-total">
        <div className="counter">
          <div className="counter-decrease">
            <Button
              onChange={changeHandler}
              color="warning"
              size="lg"
              name="quantity-button"
              type="button"
              onClick={decrease}
              disabled={count <= 1 ? true : false}
            >
              -
            </Button>
          </div>
          <div
            className="counter-count"
            name="quantity"
            value={formData.quantity}
          >
            {count}
          </div>
          <div className="counter-increase">
            <Button
              onChange={changeHandler}
              color="warning"
              size="lg"
              name="quantity-button"
              type="button"
              onClick={increase}
              disabled={count >= 10 ? true : false}
            >
              +
            </Button>
          </div>
        </div>
        <div className="total-button">
          <div className="order-total">
            <div className="siparis-toplami">Sipariş Toplamı</div>
            <div className="secimler">
              Seçimler:
              {numberOfIngredients * 5}₺
            </div>
            <div className="toplam">
              Toplam:
              {count * (numberOfIngredients * 5 + newPrice(price))}₺
            </div>
          </div>
          <div className="order-button">
            <Button
              id="order-button"
              color="warning"
              disabled={isDisabled}
              type="submit"
            >
              SİPARİŞ VER
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default SiparisFormu;
