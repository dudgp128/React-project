import styled from 'styled-components';
import Button from './Button';
import Responsive from './Responsive';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
`;

// Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성하기
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .right {
    display: flex;
    align-items: center;
  }
`;

// 헤더가 fixed로 고정되어 있기 때문에, 페이지 콘텐츠를 4rem 아래에 나타내기
const Spacer = styled.div`
  height: 4rem;
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="logo">REACTERS</div>
          <div className="right">
            <Button>로그인</Button>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
