import styled from "styled-components";

const LoginFormWrapper = styled.div``;
const Input = styled.input`
      border-radius: 12px;
      border: 1px solid var(--bg-body-border);
      outline: none;
      padding: 0.5rem 0.7rem;
      margin: 0.3rem;
`;

export default function LoginForm() {
      return (
            <>
                  <LoginFormWrapper>
                        <Input type="text" />
                        <Input type="password" />
                  </LoginFormWrapper>
            </>
      );
}
