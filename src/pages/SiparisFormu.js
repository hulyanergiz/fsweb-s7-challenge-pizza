import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import "./SiparisFormu.css";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const SiparisFormu = (props) => {
  let { price } = props;

  const pizza = [
    {
      size: ["Küçük", "Orta", "Büyük"],
      thickness: ["Hamur Kalınlığı", "İnce", "Normal", "Kalın"],
      extraIngredients: [
        "Pepperoni",
        "Domates",
        "Biber",
        "Sosis",
        "Misir",
        "Sucuk",
        "Kanada Jambonu",
        "Kekik",
        "Ananas",
        "Tavuk Izgara",
        "Jalepano",
        "Kabak",
        "Sogan",
        "Sarimsak",
      ],
      extraIngredientsPrice: 5,
    },
  ];

  const initialForm = {
    size: [],
    thickness: [],
    extraIngredients: [],
    note: "",
    count: 1,
    ingredTotalCost: 0,
    totalPrice: 0,
  };

  const initialError = {
    size: "",
    thickness: "",
    extraIngredients: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState(initialError);
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();
  const [ingredTotalCost, setIngredTotalCost] = useState(0);

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
    size: yup.string().oneOf(pizza[0].size, "Bir boyut seçmelisiniz."),
    thickness: yup
      .string()
      .notOneOf([pizza[0].thickness[0]], "Bir hamur kalınlığı seçmelisiniz"),
    extraIngredients: yup
      .array()
      .max(10, "En fazla 10 ek malzeme seçebilirsiniz."),
  });

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setIsValid(valid));
  }, [formData]);

  useEffect(() => {
    const newFormData = { ...formData };
    newFormData.ingredTotalCost = newFormData.count * ingredTotalCost;
    newFormData.totalPrice =
      newFormData.count * newPrice + newFormData.ingredTotalCost;
    setFormData(newFormData);
  }, [ingredTotalCost, formData.count]);

  const [count, setCount] = useState(1);
  const decrease = () => {
    setCount(count - 1);
  };
  const increase = () => {
    setCount(count + 1);
  };

  const changeHandler = (event) => {
    let { name } = event.target;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    let newFormData = {
      ...formData,
    };
    if (event.target.type === "checkbox") {
      if (value) {
        newFormData.extraIngredients.push(name);
        setIngredTotalCost((e) => e + pizza[0].extraIngredientsPrice);
      } else {
        const ind = newFormData.extraIngredients.indexOf(name);
        newFormData.extraIngredients.splice(ind, 1);
        setIngredTotalCost((e) => e - pizza[0].extraIngredientsPrice);
      }
      yup
        .reach(formSchema, "extraIngredients")
        .validate(newFormData.extraIngredients)
        .then(() => {
          const newErrors = { ...errors, extraIngredients: "" };
          setErrors(newErrors);
        })
        .catch((error) => {
          const newErrors = { ...errors, extraIngredients: error.errors[0] };
          setErrors(newErrors);
        });
    } else {
      newFormData[name] = value;

      if ("size" === name || "thickness" === name) {
        yup
          .reach(formSchema, name)
          .validate(value)
          .then(() => {
            const newErrors = { ...errors, [name]: "" };
            setErrors(newErrors);
          })
          .catch((error) => {
            const newErrors = { ...errors, [name]: error.errors[0] };
            setErrors(newErrors);
          });
      }
    }

    console.log(newFormData);

    setFormData(newFormData);
  };

  const orderData = {
    pizzaName: "Position Absolute Acı Pizza",
    size: formData.size,
    thickness: formData.thickness,
    extraIngredients: formData.extraIngredients,
    secimler: count * ingredTotalCost,
    totalPrice: count * (ingredTotalCost + newPrice(price)),
  };
  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        setFormData({
          ...formData,
          id: res.data.id,
          createdAt: res.data.createdAt,
        });
      })
      .catch((error) => {
        console.log(error.response.message);
      });

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
                data-testid="input"
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
                data-testid="input"
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
                data-testid="input"
              />
              <label htmlFor="büyük">Büyük</label>
            </div>
          </div>
          {errors.size && <p className="error">{errors.size}</p>}
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
          {errors.thickness && <p className="error">{errors.thickness}</p>}
        </div>
      </div>

      <div className="extra-ingredients-container">
        <p className="titles">Ek Malzemeler</p>
        <p className="extra-ingredients-details">
          En fazla 10 malzeme seçebilirsiniz.5₺
        </p>
        <div className="extra-ingredients">
          {pizza[0].extraIngredients.map((item, index) => (
            <div className="checkbox-input-label">
              <input
                id={item}
                name={item}
                key={index}
                type="checkbox"
                checked={formData.extraIngredients.includes(item)}
                onChange={changeHandler}
                data-testid="input"
              ></input>
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>
        {errors.extraIngredients && (
          <p className="error">{errors.extraIngredients}</p>
        )}
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
              data-testid="counter"
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
              data-testid="counter"
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
              {orderData.secimler}₺
            </div>
            <div className="toplam">
              Toplam:
              {orderData.totalPrice}₺
            </div>
          </div>
          <div className="order-button">
            <Button
              id="order-button"
              color="warning"
              disabled={!isValid}
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
