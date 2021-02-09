import styled from 'styled-components';

export const Button = styled.button`
text-transform:capitalize;
font-size:1rem;
background: transparent;
border: 0.2rem solid var(--mainBlue);
color: var(--mainBlue);
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor:pointer
margin:0.2rem 0.5rem 0.2rem
transition: all 0.5s ease-in-out;
&:hover{
  background:var(--mainBlue);
  color:var(--lightBlue);
}
&:focus {
  outline: none;
}
`
export const OrderButton = styled.button`
text-transform:capitalize;
font-size:1rem;
width: 100%;
background: var(--mainBlue);
border: 0.2rem solid var(--mainWhite);
color: var(--mainWhite);
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor:pointer
margin:1rem 1rem 1rem 1rem
transition: all 0.5s ease-in-out;
&:hover{
  background:var(--lightBlue);
  color:var(--mainBlue);
}
&:focus {
  outline: none;
}
`