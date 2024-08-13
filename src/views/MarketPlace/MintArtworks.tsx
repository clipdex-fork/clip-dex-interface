import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useWeb3React } from '@web3-react/core'
// import { NFT_API_SERVER } from 'config/constants/index'
import { Checkbox, Text, Button, AutoRenewIcon, ArrowBackIcon } from '@clipdex/clip-dex-uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import useMintArt from './hooks/useMintArt'

const StyledPage = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 320px);
  // background-size: cover !important;
  // background-image: ${({ theme }) => (theme.isDark ? `url('/images/black.png')` : `url('/images/light.png')`)};
  // background-repeat: no-repeat;
  // background-position: center top;
  background: ${({ theme }) => (theme.isDark ? '#10101c' : '#E5E5E5')};
  padding: 0px 16px;
`

const StyledCheckBox = styled(Checkbox)`
  background-color: ${({ theme }) => (theme.isDark ? '#222235' : '#F0F2FA')};
  border: ${({ theme }) => (theme.isDark ? '1px solid #b9b9b9' : '1px solid #E6E6E6')};
  border-radius: 4px;
  margin-right: 5px;
  min-width: 24px;
  min-height: 24px;
  margin-top: 1px;
  &:checked {
    background-color: #19274b;
  }
  &:focus {
    box-shadow: none;
  }
  &:hover {
    box-shadow: none !important;
  }
`

const StyledModal = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? '#222235' : '#fff')};
  border-radius: 20px;
  border: none;
  margin: 0 auto;
  max-height: fit-content;
  max-width: 1200px;
  padding: 24px;
  @media screen and (max-width: 400px) {
    padding: 12px;
  }
`

const CustomModalTitle = styled.div`
  font-size: 48px;
  text-align: center;
`

const CheckBoxTitle = styled.span`
  color: ${({ theme }) => (theme.isDark ? '#B9B9B9' : '#757D93')};
  line-height: 20px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
`

const RightTitle = styled.span`
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274B')};
`

const SpanCenterBox = styled.div`
  margin-top: 12px;
  text-align: center;
`
const FormPanel = styled.div`
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  // justify-content: center;
  margin-top: 30px;

  @media screen and (max-width: 1280px) {
    // align-items: center;
    // flex-direction: column;
  }
`

const Media = styled.div`
  // width: 40%;
  text-align: center;

  & img {
    width: 320px;
    height: 320px;
    border-radius: 20px;
  }

  @media screen and (max-width: 1280px) {
    width: 100%;
  }

  @media screen and (max-width: 448px) {
    & img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
`

const Inputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
  @media screen and (max-width: 1280px) {
    align-items: center;
    flex-direction: column;
  }
`

const CustomSpan = styled.span`
  color: ${({ theme }) => (theme.isDark ? '#b9b9b999' : '#19274b99')};
  font-size: 13px;
  line-height: 16px;
`

const InputItem = styled.div`
  margin: 12px 10px;
`

const SuggetedItem = styled.div`
  display: inline-flex;
`

const CenterItem = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  margin: 32px 10px 15px 10px;
`

const FileUploadContainer = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  margin: 0px 10px;
`

const CustomTextArea = styled.textarea`
  width: 100%;
  height: 165px;
  border: none;
  background-color: ${({ theme }) => (theme.isDark ? '#32323E' : 'rgba(0, 0, 0, 0.1)')};
  margin-top: 8px;
  border-radius: 10px;
  padding: 10px;
  color: ${({ theme }) => (theme.isDark ? '#d2d2cb' : '##2b353f')};
  font-size: 18px;
  box-shadow: inset 0px 2px 2px -1px rgb(74 74 104 / 10%);
  :focus {
    outline: #ad8fe8;
    border: 1px solid #ad8fe8;
    border-color: #ad8fe8;
  }
  ::placeholder {
    color: ${({ theme }) => (theme.isDark ? '#8e8e9599' : '#19274b99')};
    font-weight: 400;
    font-size: 15px;
  }
`

const InputLabel = styled.span`
  font-size: 15px;
  min-width: 140px;
  font-weight: 500;
  color: ${({ theme }) => (theme.isDark ? 'rgba(185, 185, 185, 0.6)' : 'rgba(25, 39, 75, 0.6)')};
  margin-bottom: 12px;
  text-align: left;
`

const CustomInput = styled.input`
  width: 100%;
  border-radius: 9px;
  border: none;
  background-color: ${({ theme }) => (theme.isDark ? '#32323E' : 'rgba(0, 0, 0, 0.1)')};
  height: 50px;
  font-size: 15px;
  color: ${({ theme }) => (theme.isDark ? 'white' : '#19274B')};
  box-shadow: inset 0px 2px 2px -1px rgb(74 74 104 / 10%);
  outline: none;
  margin: auto;
  padding-left: 20px;
  margin-top: 8px;

  :focus {
    outline: #ad8fe8;
    border: 1px solid #ad8fe8;
    border-color: #ad8fe8;
  }
  ::placeholder {
    color: ${({ theme }) => (theme.isDark ? '#8e8e9599' : '#19274b99')};
    font-weight: 400;
    font-size: 15px;
  }
`

const ContentButton = styled(Button)`
  height: 50px;
  border-radius: 9px;
  border: none;
  background-color: #ca492a;
  color: white;
  padding: 12 0px;
  font-size: 17px;
  letter-spacing: -0.3px;
  cursor: pointer;
  width: 430px;
  box-shadow: none;
`

const BackButtonContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

const BackButton = styled(Button)`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274b99')};
  font-size: 18px;
  letter-spacing: -0.3px;
  cursor: pointer;
  box-shadow: none;
`

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  margin: 0 auto 24px auto;
`

const StyledForm = styled.div`
  width: 50%;
`

interface IFormInput {
  artworkType: string
  artworkName: string
  artistName: string
  portfolioUrl: string
  aboutArtist: string
  royalties: number
}

export default function MintArtworks() {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()

  const [confirmed, setConfirmed] = useState(false)
  const uploadArtworkImage = t('Upload your artwork image')
  const [image, setImage] = useState({ preview: '', raw: '' })
  const [UFName, setUFName] = useState('')
  const [UFType, setUFType] = useState('')
  const { theme } = useTheme()
  const [artworkFile, setArtworkFile] = useState()
  const { onMintArt } = useMintArt(account)

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      })
    }
    setArtworkFile(e.target.files[0])
    setUFName(e.target.files[0].name)
    setUFType(e.target.files[0].type)
  }

  const suggested = t('Suggested: ')
  const percentages = t('10%, 20%, 30%')

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>()

  const [isMinting, setIsMinting] = useState(false)

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!account) {
      toastError('Error', 'Please CONNECT TO WALLET!')
      return
    }

    const formData = new FormData()
    formData.append('artworkType', data.artworkType)
    formData.append('artworkName', data.artworkName)
    formData.append('artistName', data.artistName)
    formData.append('portfolioURL', data.portfolioUrl)
    formData.append('description', data.aboutArtist)
    formData.append('royalties', data.royalties.toString())
    formData.append('artworkFile', artworkFile)
    formData.append('address', account)

    setIsMinting(true)
    //   axios
    //     .post(`${NFT_API_SERVER}/api/v0/nft/mint`, formData)
    //     .then(async (res) => {
    //       try {
    //         if (!res.data.status) {
    //           toastError('Error', res.data.message)
    //         } else {
    //           await onMintArt(res.data.artdata.tokenNo)

    //           axios
    //             .post(`${NFT_API_SERVER}/api/v0/nft/updateMintStatus`, { tokenNo: res.data.artdata.tokenNo })
    //             .then((res1) => {
    //               try {
    //                 if (!res1.data.status) {
    //                   toastError('Error', res1.data.message)
    //                 }
    //               } catch (err) {
    //                 toastError('Mint Error', 'Mint Artwork Failed!')
    //               }
    //             })

    //           toastSuccess('Mint Success', 'Mint Artwork Success!')
    //         }
    //       } catch (err) {
    //         toastError('Mint Error', 'Mint Artwork Failed!')
    //       }
    //       setIsMinting(false)
    //     })
    //     .catch((error) => {
    //       setIsMinting(false)
    //       toastError(error.name, error.message)
    //     })
  }

  return (
    <StyledPage>
      <Wrapper>
        <StyledModal>
          <BackButtonContainer>
            <Link to="/marketplace">
              <BackButton>
                <ArrowBackIcon />
                Back
              </BackButton>
            </Link>
          </BackButtonContainer>
          <CustomModalTitle>
            <RightTitle>Artwork Information</RightTitle>
          </CustomModalTitle>
          {/* <CustomModalTitleDetail>{titleDetail}</CustomModalTitleDetail> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormPanel>
              <Media>
                {/* {theme.isDark ? (
                    <img src={image.preview ? image.preview : '/images/marketplace/dark-logo.png'} alt="asdf" />
                  ) : (
                    <img src={image.preview ? image.preview : '/images/marketplace/default.png'} alt="asdf" />
                  )} */}

                {/* (UFType === 'image/jpeg' || UFType === 'image/png' || UFType === 'image/gif') */}
                {image.preview ? (
                  UFType === 'image/jpeg' || UFType === 'image/png' || UFType === 'image/gif' ? (
                    <img src={image.preview} alt="uploadimage" />
                  ) : UFType === 'audio/mpeg' ? (
                    <audio controls>
                      <source src={image.preview} type="audio/ogg" />
                      <source src={image.preview} type="audio/mpeg" />
                      Your browser does not support the audio tag.
                    </audio>
                  ) : UFType === 'video/mp4' ? (
                    <video width="320" height="320" controls>
                      <source src={image.preview} type="video/mp4" />
                      <source src={image.preview} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <></>
                  )
                ) : theme.isDark ? (
                  <img src="/images/marketplace/dark-logo.png" alt="UploadPreviewImage" />
                ) : (
                  <img src="/images/marketplace/default.png" alt="UploadPreviewImage" />
                )}

                <SpanCenterBox>
                  <InputLabel>{uploadArtworkImage}</InputLabel>
                </SpanCenterBox>
              </Media>
              <Inputs>
                <StyledForm>
                  <InputItem>
                    <InputLabel>Artwork Type : </InputLabel>
                    <CustomInput
                      {...register('artworkType', {
                        required: true,
                        minLength: { value: 3, message: 'Artwork Type must be more than 3 letters' },
                        maxLength: { value: 10, message: 'Artwork Type must be less than 10 letters' },
                      })}
                      placeholder="Type here..."
                    />
                  </InputItem>
                  <Text
                    style={{ fontWeight: 400 }}
                    fontSize="14px"
                    color="#ff3333"
                    textAlign="right"
                    mr="20px"
                    mt="4px"
                  >
                    {errors.artworkType?.type === 'required' && 'Artwork type is required'}
                    {errors?.artworkType?.message}
                  </Text>
                  <InputItem>
                    <InputLabel>Artist Name : </InputLabel>
                    <CustomInput
                      {...register('artistName', {
                        required: true,
                        minLength: { value: 2, message: 'Artist Name must be more than 2 letters' },
                        maxLength: { value: 20, message: 'Artist Name must be less than 20 letters' },
                      })}
                      placeholder="Enter the artist name"
                    />
                  </InputItem>
                  <Text
                    style={{ fontWeight: 400 }}
                    fontSize="14px"
                    color="#ff3333"
                    textAlign="right"
                    mr="20px"
                    mt="4px"
                  >
                    {errors.artistName?.type === 'required' && 'Artist name is required'}
                    {errors?.artistName?.message}
                  </Text>
                  <InputItem>
                    <InputLabel>About the Artist : </InputLabel>
                    <CustomTextArea
                      {...register('aboutArtist', {
                        required: true,
                        minLength: { value: 20, message: 'This field must be more than 20 letters' },
                        maxLength: { value: 200, message: 'This field must be less than 200 letters' },
                      })}
                      placeholder="Enter the brief introduction"
                    />
                  </InputItem>
                  <Text
                    style={{ fontWeight: 400 }}
                    fontSize="14px"
                    color="#ff3333"
                    textAlign="right"
                    mr="20px"
                    mt="4px"
                  >
                    {errors.aboutArtist?.type === 'required' && 'This field is required'}
                    {errors?.aboutArtist?.message}
                  </Text>
                </StyledForm>
                <StyledForm>
                  <InputItem>
                    <InputLabel>Artwork Name : </InputLabel>
                    <CustomInput
                      {...register('artworkName', {
                        required: true,
                        minLength: { value: 3, message: 'Artwork Name must be more than 3 letters' },
                        maxLength: { value: 20, message: 'Artwork Name must be less than 20 letters' },
                      })}
                      placeholder="Enter the art work name"
                    />
                  </InputItem>
                  <Text
                    style={{ fontWeight: 400 }}
                    fontSize="14px"
                    color="#ff3333"
                    textAlign="right"
                    mr="20px"
                    mt="4px"
                  >
                    {errors.artworkName?.type === 'required' && 'Artwork Name is required'}
                    {errors?.artworkName?.message}
                  </Text>
                  <InputItem>
                    <InputLabel>Portfolio URL : </InputLabel>
                    <CustomInput
                      {...register('portfolioUrl', { required: true, pattern: /^(ftp|http|https):\/\/[^ "]+$/ })}
                      placeholder="Personal website, instogram, Twitter, etc."
                    />
                  </InputItem>
                  <Text
                    style={{ fontWeight: 400 }}
                    fontSize="14px"
                    color="#ff3333"
                    textAlign="right"
                    mr="20px"
                    mt="4px"
                  >
                    {errors.portfolioUrl && errors.portfolioUrl.type === 'required' && 'PortfolioUrl is required'}
                    {errors.portfolioUrl &&
                      errors.portfolioUrl.type === 'pattern' &&
                      'URL is invalid. Ex: http://www.portfolio.com'}
                  </Text>
                  <InputItem>
                    <InputLabel>Royalties (%): </InputLabel>
                    <CustomInput
                      type="number"
                      {...register('royalties', {
                        required: true,
                        min: { value: 0, message: 'This field is required between 0 ~ 100' },
                        max: { value: 100, message: 'This field is required between 0 ~ 100' },
                      })}
                      placeholder="0"
                    />
                  </InputItem>
                  <Text
                    style={{ fontWeight: 400 }}
                    fontSize="14px"
                    color="#ff3333"
                    textAlign="right"
                    mr="20px"
                    mt="4px"
                  >
                    {errors.royalties?.type === 'required' && 'This field is required'}
                    {errors?.royalties?.message}
                  </Text>
                  <SuggetedItem style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <CustomSpan>{suggested}</CustomSpan>
                    <CustomSpan>{percentages}</CustomSpan>
                  </SuggetedItem>
                  <FileUploadContainer>
                    <InputLabel>File Upload: </InputLabel>
                    <div style={{ display: 'flex' }}>
                      <CustomInput value={image.preview ? UFName : 'Browse files...'} disabled />
                      <label
                        htmlFor="upload-button"
                        style={{
                          margin: '8px 12px 0px 12px',
                          backgroundColor: '#ca492a',
                          borderRadius: '9px',
                          cursor: 'pointer',
                          height: '50px',
                        }}
                      >
                        {image.preview ? (
                          <>
                            <span className="fa-stack fa-2x mt-3 mb-2">
                              <i className="fas fa-circle fa-stack-2x" />
                              <i className="fas fa-store fa-stack-1x fa-inverse" />
                            </span>
                            <h5
                              className="text-center"
                              style={{
                                padding: '17px 26px',
                                fontSize: '17px',
                                color: 'white',
                                cursor: 'pointer',
                              }}
                            >
                              Upload
                            </h5>
                          </>
                        ) : (
                          <>
                            <span className="fa-stack fa-2x mt-3 mb-2">
                              <i className="fas fa-circle fa-stack-2x" />
                              <i className="fas fa-store fa-stack-1x fa-inverse" />
                            </span>
                            <h5
                              className="text-center"
                              style={{
                                padding: '17px 26px',
                                fontSize: '17px',
                                color: 'white',
                                cursor: 'pointer',
                              }}
                            >
                              Upload
                            </h5>
                          </>
                        )}
                      </label>
                      <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleChange} />
                    </div>
                  </FileUploadContainer>
                </StyledForm>
              </Inputs>
            </FormPanel>

            <CenterItem>
              <StyledCheckBox checked={confirmed} onChange={() => setConfirmed(!confirmed)} scale="sm" />
              <CheckBoxTitle>
                I declare that this is an original artwork. I understand that no plagiarism is allowed, and that the
                artwork can be removed anytime if detected.
              </CheckBoxTitle>
            </CenterItem>
            <CenterItem>
              {confirmed ? (
                <ContentButton
                  type="submit"
                  isLoading={isMinting}
                  endIcon={isMinting ? <AutoRenewIcon spin color="currentColor" /> : null}
                  backgroundColor="#ca492a"
                  style={{ marginTop: '20px' }}
                >
                  Mint Artwork
                </ContentButton>
              ) : (
                <ContentButton
                  type="submit"
                  backgroundColor="#BDC2C4"
                  scale="sm"
                  style={{ marginTop: '20px' }}
                  disabled
                >
                  Mint Artwork
                </ContentButton>
              )}
            </CenterItem>
          </form>
        </StyledModal>
      </Wrapper>
    </StyledPage>
  )
}
