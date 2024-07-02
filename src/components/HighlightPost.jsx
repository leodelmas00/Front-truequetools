import React, { useState } from 'react';
import '../styles/HighlightPost.css';
import { IoChevronBackCircle } from "react-icons/io5";
import { TbCoinFilled } from "react-icons/tb";

function HighlightPost() {
  const [cardNumber1, setCardNumber1] = useState("");
  const [cardNumber2, setCardNumber2] = useState("");
  const [cardNumber3, setCardNumber3] = useState("");
  const [cardNumber4, setCardNumber4] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInsufficientMessage, setShowInsufficientMessage] = useState(false);
  const [showIncompleteFieldsMessage, setShowIncompleteFieldsMessage] = useState(false);

  const handleGoBack = () => {
    window.history.back(); // Redirige a la página anterior en el historial del navegador
  };

  const handlePagar = () => {
    // Verificar si algún campo está vacío
    if (!cardNumber1 || !cardNumber2 || !cardNumber3 || !cardNumber4 || !expiryDate || !cvv) {
      setShowIncompleteFieldsMessage(true);
      setShowInsufficientMessage(false);
      setShowSuccess(false);
      return;
    }

    // Verificar si los números de tarjeta son todos 1111
    if (cardNumber1 === "1111" && cardNumber2 === "1111" && cardNumber3 === "1111" && cardNumber4 === "1111") {
      setShowInsufficientMessage(true);
      setShowSuccess(false);
      setShowIncompleteFieldsMessage(false);
      // Reiniciar los campos
      setCardNumber1("");
      setCardNumber2("");
      setCardNumber3("");
      setCardNumber4("");
      setExpiryDate("");
      setCvv("");
    }
    // Verificar si los números de tarjeta son todos 2222
    else if (cardNumber1 === "2222" && cardNumber2 === "2222" && cardNumber3 === "2222" && cardNumber4 === "2222") {
      setShowSuccess(true);
      setShowInsufficientMessage(false);
      setShowIncompleteFieldsMessage(false);
    } else {
      setShowSuccess(false);
      setShowInsufficientMessage(false);
      setShowIncompleteFieldsMessage(false);
    }
  };

  const handleAceptar = () => {
    setShowInsufficientMessage(false);
    setShowSuccess(false);
    setShowIncompleteFieldsMessage(false);
  };

  const handleAceptarSuccess = () => {
    setShowSuccess(false);
    // Redirigir a /SignIn
    window.location.href = "/SignIn";
  };

  return (
    <div className="container-card">
      <div>
        <button className="volver-btn" onClick={handleGoBack}>
          <IoChevronBackCircle size={25} />
          Volver
        </button>
      </div>

      <div className="container-precio">
        <p className="monto-a-pagar">Monto a pagar: $9,999</p>
      </div>

      <div className="credit-card">
        <div className="blackline"></div>
        <div className="card-number">
          <input type="text" maxLength="4" placeholder="XXXX" required value={cardNumber1} onChange={(e) => setCardNumber1(e.target.value)} />
          <input type="text" maxLength="4" placeholder="XXXX" required value={cardNumber2} onChange={(e) => setCardNumber2(e.target.value)} />
          <input type="text" maxLength="4" placeholder="XXXX" required value={cardNumber3} onChange={(e) => setCardNumber3(e.target.value)} />
          <input type="text" maxLength="4" placeholder="XXXX" required value={cardNumber4} onChange={(e) => setCardNumber4(e.target.value)} />
        </div>
        <div className="card-details">
          <div className="expiry-date">
            <label htmlFor="expiry">Fecha de Caducidad</label>
            <input type="text" maxLength="4" id="expiry" placeholder="MM/AA" required value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          </div>
          <div className="cvv">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" maxLength="3" placeholder="XXX" required value={cvv} onChange={(e) => setCvv(e.target.value)} />
          </div>
        </div>
      </div>

      <button className="pagar-btn" onClick={handlePagar}>
        Pagar <TbCoinFilled size={25} />
      </button>

      {showSuccess && (
        <div className="mensaje-emergente">
          <div className="modal-content">
            <p>Pago exitoso ¡Muchas gracias!</p>
            <button className="aceptar-btn" onClick={handleAceptarSuccess}>Aceptar</button>
          </div>
        </div>
      )}

      {showInsufficientMessage && (
        <div className="mensaje-emergente">
          <div className="modal-content">
            <p>Monto insuficiente, por favor vuelva a intentarlo.</p>
            <button className="aceptar-btn" onClick={handleAceptar}>Aceptar</button>
          </div>
        </div>
      )}

      {showIncompleteFieldsMessage && (
        <div className="mensaje-emergente">
          <div className="modal-content">
            <p>Por favor complete todos los campos.</p>
            <button className="aceptar-btn" onClick={handleAceptar}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HighlightPost;
