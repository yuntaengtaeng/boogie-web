## 실제 서비스 중인 페이지
[서일대 졸업작품전](http://seoilsw.kr/)

## 📃 프로젝트 목적
- 졸업작품
- 학교의 기존 졸업작품전 페이지가 기능 및 유지 보수 성이 낮은 편이었기에 우리가 새롭게 리뉴얼해서 만들어 보자로 시작하여
 **졸업작품 전시와 취업 연계를 한 번에 할 수 있도록 개선하여 제작**

## 🔈 프로젝트를 시작하는 방법
1. npm install을 이용하여 모듈 설치
2. npm run start를 사용하여 Web 실행

## 💻 사용한 기술, 모듈, 외부 리소스
#### 주 기술
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

#### 모듈, 외부 리소스

- react
- axios
- http-proxy-middleware
- @reduxjs/toolkit, react-redux
- react-datepicker
- react-icons
- react-pdf
- react-router-dom
- styled-components, styled-reset
- swiper

## 📂 프로젝트 폴더 구조
```
📦src
 ┣ 📂components
 ┃ ┣ 📂Administrate
 ┃ ┃ ┣ 📂AddAdmin
 ┃ ┃ ┃ ┣ 📜AdminTable.jsx
 ┃ ┃ ┃ ┗ 📜Form.jsx
 ┃ ┃ ┣ 📂BannerManagement
 ┃ ┃ ┃ ┣ 📜AddBanner.jsx
 ┃ ┃ ┃ ┗ 📜BannerList.jsx
 ┃ ┃ ┣ 📂Contents
 ┃ ┃ ┃ ┣ 📜AddAdmin.jsx
 ┃ ┃ ┃ ┣ 📜BannerManagement.jsx
 ┃ ┃ ┃ ┣ 📜UserManagement.jsx
 ┃ ┃ ┃ ┗ 📜YearManagement.jsx
 ┃ ┃ ┣ 📂UserManagement
 ┃ ┃ ┃ ┣ 📜Context.jsx
 ┃ ┃ ┃ ┣ 📜Form.jsx
 ┃ ┃ ┃ ┣ 📜Inner.jsx
 ┃ ┃ ┃ ┗ 📜UserTable.jsx
 ┃ ┃ ┗ 📂YeasManagement
 ┃ ┃ ┃ ┣ 📜Form.jsx
 ┃ ┃ ┃ ┗ 📜YearTable.jsx
 ┃ ┣ 📂Community
 ┃ ┃ ┣ 📂Common
 ┃ ┃ ┃ ┗ 📜CommentAndLike.jsx
 ┃ ┃ ┣ 📂Detail
 ┃ ┃ ┃ ┣ 📜Comment.jsx
 ┃ ┃ ┃ ┣ 📜CommentList.jsx
 ┃ ┃ ┃ ┣ 📜Content.jsx
 ┃ ┃ ┃ ┣ 📜EditComment.jsx
 ┃ ┃ ┃ ┗ 📜Menu.jsx
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┣ 📜BestPick.jsx
 ┃ ┃ ┃ ┣ 📜CategoryButton.jsx
 ┃ ┃ ┃ ┣ 📜CategoryList.jsx
 ┃ ┃ ┃ ┣ 📜PostItem.jsx
 ┃ ┃ ┃ ┣ 📜PostItemList.jsx
 ┃ ┃ ┃ ┗ 📜PostWrite.jsx
 ┃ ┃ ┗ 📜Edit.jsx
 ┃ ┣ 📂Jobposting
 ┃ ┃ ┣ 📂Add
 ┃ ┃ ┃ ┣ 📜AddressSearch.jsx
 ┃ ┃ ┃ ┣ 📜DetailInfo.jsx
 ┃ ┃ ┃ ┗ 📜FloatingButton.jsx
 ┃ ┃ ┣ 📂Detail
 ┃ ┃ ┃ ┣ 📜ApplcantsModal.jsx
 ┃ ┃ ┃ ┣ 📜Map.jsx
 ┃ ┃ ┃ ┗ 📜Precautions.jsx
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┣ 📜Context.jsx
 ┃ ┃ ┃ ┣ 📜FilterModal.jsx
 ┃ ┃ ┃ ┣ 📜Inner.jsx
 ┃ ┃ ┃ ┣ 📜JobPostingGroup.jsx
 ┃ ┃ ┃ ┗ 📜Title.jsx
 ┃ ┃ ┗ 📜Edit.jsx
 ┃ ┣ 📂Login
 ┃ ┃ ┣ 📜LoginForm.jsx
 ┃ ┃ ┗ 📜LoginModal.jsx
 ┃ ┣ 📂Main
 ┃ ┃ ┣ 📂Add
 ┃ ┃ ┃ ┣ 📜GroupInfoInput.jsx
 ┃ ┃ ┃ ┣ 📜PlattformsAndTechnologysSelect.jsx
 ┃ ┃ ┃ ┣ 📜ProjectDesignPdf.jsx
 ┃ ┃ ┃ ┣ 📜ProjectVideoLink.jsx
 ┃ ┃ ┃ ┗ 📜TeamInput.jsx
 ┃ ┃ ┣ 📂Detail
 ┃ ┃ ┃ ┣ 📜DemonstrationVideo.jsx
 ┃ ┃ ┃ ┣ 📜DetailContents.jsx
 ┃ ┃ ┃ ┣ 📜MemberIntroduction.jsx
 ┃ ┃ ┃ ┣ 📜MobilePdfViewer.jsx
 ┃ ┃ ┃ ┣ 📜PdfViewer.jsx
 ┃ ┃ ┃ ┣ 📜ProjectDesign.jsx
 ┃ ┃ ┃ ┣ 📜Recommend.jsx
 ┃ ┃ ┃ ┣ 📜TabMenu.jsx
 ┃ ┃ ┃ ┗ 📜Title.jsx
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┣ 📜FilterForm.jsx
 ┃ ┃ ┃ ┣ 📜Inner.jsx
 ┃ ┃ ┃ ┣ 📜MainCardList.jsx
 ┃ ┃ ┃ ┣ 📜MainCardPreview.jsx
 ┃ ┃ ┃ ┣ 📜MainContext.jsx
 ┃ ┃ ┃ ┣ 📜MainFilter.jsx
 ┃ ┃ ┃ ┗ 📜MainHeader.jsx
 ┃ ┃ ┗ 📜Form.jsx
 ┃ ┣ 📂Profile
 ┃ ┃ ┣ 📜AddProfileImage.jsx
 ┃ ┃ ┣ 📜AwardsAccolades.jsx
 ┃ ┃ ┣ 📜ChangeNickNameModal.jsx
 ┃ ┃ ┣ 📜LinkInformation.jsx
 ┃ ┃ ┣ 📜NondisclosurePage.jsx
 ┃ ┃ ┣ 📜ProfileCreationPage.jsx
 ┃ ┃ ┣ 📜ProfileInformation.jsx
 ┃ ┃ ┣ 📜ProfileIntroduction.jsx
 ┃ ┃ ┗ 📜SelectGroub.jsx
 ┃ ┣ 📂Route
 ┃ ┃ ┣ 📜AdminRoute.jsx
 ┃ ┃ ┗ 📜PrivateRoute.jsx
 ┃ ┗ 📂Ui
 ┃ ┃ ┣ 📂Card
 ┃ ┃ ┃ ┣ 📜Card.jsx
 ┃ ┃ ┃ ┣ 📜CardPreview.jsx
 ┃ ┃ ┃ ┗ 📜CardProfile.jsx
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜Mobile.jsx
 ┃ ┃ ┃ ┗ 📜Web.jsx
 ┃ ┃ ┣ 📂Layout
 ┃ ┃ ┃ ┣ 📜BaseLayout.jsx
 ┃ ┃ ┃ ┣ 📜GridCardPreview.jsx
 ┃ ┃ ┃ ┗ 📜VerticalSpace.jsx
 ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┃ ┣ 📜Backdrop.js
 ┃ ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┃ ┣ 📜Modal.js
 ┃ ┃ ┃ ┗ 📜ModalOverlay.js
 ┃ ┃ ┣ 📜BasicTable.jsx
 ┃ ┃ ┣ 📜Block.jsx
 ┃ ┃ ┣ 📜Button.jsx
 ┃ ┃ ┣ 📜Chip.jsx
 ┃ ┃ ┣ 📜DeleteLable.jsx
 ┃ ┃ ┣ 📜DeleteOutLineButton.jsx
 ┃ ┃ ┣ 📜Dropdown.jsx
 ┃ ┃ ┣ 📜ExplanationBox.jsx
 ┃ ┃ ┣ 📜Footer.jsx
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┣ 📜HoverTransform.jsx
 ┃ ┃ ┣ 📜IconRound.jsx
 ┃ ┃ ┣ 📜Input.jsx
 ┃ ┃ ┣ 📜Line.jsx
 ┃ ┃ ┣ 📜Loading.jsx
 ┃ ┃ ┣ 📜OutLineButton.jsx
 ┃ ┃ ┣ 📜ProfileImage.jsx
 ┃ ┃ ┣ 📜SearchSelect.jsx
 ┃ ┃ ┣ 📜SelectYear.jsx
 ┃ ┃ ┣ 📜SwiperBanner.jsx
 ┃ ┃ ┣ 📜TextButton.jsx
 ┃ ┃ ┣ 📜ToogleButton.jsx
 ┃ ┃ ┗ 📜Tooltip.jsx
 ┣ 📂constants
 ┃ ┗ 📜color.js
 ┣ 📂hooks
 ┃ ┣ 📜useDeviceDetect.js
 ┃ ┗ 📜useGetCategory.js
 ┣ 📂pages
 ┃ ┣ 📂Auth
 ┃ ┃ ┣ 📜Join.js
 ┃ ┃ ┣ 📜Login.js
 ┃ ┃ ┗ 📜ResetPassword.jsx
 ┃ ┣ 📂Community
 ┃ ┃ ┣ 📜Add.js
 ┃ ┃ ┣ 📜Amend.jsx
 ┃ ┃ ┣ 📜Community.js
 ┃ ┃ ┗ 📜Detail.js
 ┃ ┣ 📂JobPosting
 ┃ ┃ ┣ 📜Add.js
 ┃ ┃ ┣ 📜Amend.jsx
 ┃ ┃ ┣ 📜Detail.js
 ┃ ┃ ┗ 📜JobPosting.js
 ┃ ┣ 📂Main
 ┃ ┃ ┣ 📜Add.js
 ┃ ┃ ┣ 📜Amend.jsx
 ┃ ┃ ┣ 📜Detail.js
 ┃ ┃ ┗ 📜Main.js
 ┃ ┣ 📂Profile
 ┃ ┃ ┗ 📜Detail.js
 ┃ ┣ 📜Administrate.jsx
 ┃ ┣ 📜NoAccess.jsx
 ┃ ┗ 📜NotFound.jsx
 ┣ 📂slices
 ┃ ┣ 📜ui.js
 ┃ ┗ 📜user.js
 ┣ 📂store
 ┃ ┣ 📜index.js
 ┃ ┗ 📜reducer.js
 ┣ 📂styles
 ┃ ┗ 📂fonts
 ┃ ┃ ┣ 📜LICENSE_OFL.txt
 ┃ ┃ ┣ 📜NotoSansKR ...
 ┣ 📂Utills
 ┃ ┗ 📜common.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜AppInner.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜setupProxy.js
 ┗ 📜util.js
 ```

## 📸 프로젝트 사진
![image](https://user-images.githubusercontent.com/94745651/201587567-0f4c6d1b-5727-469a-8c0b-71dae4f91b2b.png)
***
![image (1)](https://user-images.githubusercontent.com/94745651/201587634-aecd2afe-f72d-4744-8061-135b9668af74.png)

## 📜 기능
- 졸업작품전
  - 졸업작품전 글 게시, 수정, 삭제
  - 작성된 졸업작품을 한 눈에 보기 쉽게 제공
- 채용공고
  - 채용공고 글 작성, 수정, 삭제
  - 작성된 채용공고를 한 눈에 보기 쉽게 제공
  - 작성된 채용공고를 보고 지원 가능
- 커뮤니티
  - 사용자가 여러가지 고민 등을 올릴 수 있는 커뮤니티 제공
- 관리자 페이지
  -  학생 가입자의 학번, 이름 수정
  -  관리자 추가 및 삭제
  -  배너 사진 추가 및 삭제
  -  졸업작품전 개시 연도 추가 및 삭제
