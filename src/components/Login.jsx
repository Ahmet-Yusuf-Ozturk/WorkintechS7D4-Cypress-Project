import { useEffect, useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });
  };

  function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
  }
  function validatePassword(password) {
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        return passwordRegex.test(password);
  }
  

  useEffect(() => {
    setIsValid(
      validateEmail(form.email) &&
      validatePassword(form.password) &&
      form.terms
    );
  }, [form]);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValid) {
      axios
        .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((res) => {
          const user = res.data.find(
            (item) => item.password == form.password && item.email == form.email
          );
          if (user) {
            setForm(initialForm);
            history.push('/success');
          } else {
            history.push('/error');
          }
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          data-cy="email-input"
          invalid={
            !validateEmail(form.email)
          }
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
        />
        <FormFeedback data-cy="error-message-email">Please enter a valid email address!</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          data-cy="password-input"
          invalid={validatePassword(form.password)===
            false
          }
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
        />
        <FormFeedback data-cy="error-message-password">Not strong enough.</FormFeedback>
      </FormGroup>
      <FormGroup check>
        <Input
          data-cy="terms-checkbox"
          invalid={!form.terms}
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
        />
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button
        data-cy="submit-button"
         disabled={isValid===false} color="primary">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
