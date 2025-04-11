import { nanoid } from 'nanoid';
import { useRef } from 'react';
import Label from '../../Component/Label';
import Input from '../../Component/Input';

const ContainerImage = ({Picture, SetPicture,Content, setContent,SetFilePicture}) => {
    const ContainerImage = useRef();

   
    console.log(Picture)
    const HandleFileImage = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return false
        }
        const ContentType = ['image/png', 'image/jpg', 'image/jpeg']
        if (ContentType.includes(file.type) && file.size < 3000000) {
            const renamed = nanoid(10);
            const UpdateFile = new File([file], renamed, {
                type: file.type
            })
            
            const Files = new FormData();
            Files.append('fileImage', UpdateFile)
            SetFilePicture(UpdateFile)
            SetPicture(URL.createObjectURL(UpdateFile))
            
            const PictureName = Files.get('fileImage').name
            setContent(()=>({...Content,PictureName}))
        }
    }
    
    
    return (
        <div className='UploadImg'>
            <form action="" >
                <p>Upload Image</p>
                <Label For="img" Content={
                    <div ref={ContainerImage} className='ContainerImage' style={{backgroundImage:"url('/Public/Images/icons8-upload-100.png')"}}

                        onMouseLeave={() => {
                            if (Picture) {
                                document.getElementById("Images").removeAttribute('hidden')
                            }
                            ContainerImage.current.style.backgroundImage = "url('/Public/Images/icons8-upload-100.png')"
                        }}

                        onMouseEnter={() => {
                            if (Picture) {
                                document.getElementById("Images").setAttribute('hidden', true)
                            }
                            ContainerImage.current.style.backgroundImage = "url('/Public/Images/icons8-upload-100.png')"
                        }} >

                        {Picture ? <img id="Images" src={Picture} hidden={Picture?false:true}></img> : null}
                    </div>
                }></Label>
                <Input nameId="img" TypeInput="file" onChange={HandleFileImage} hidden></Input>
            </form>
        </div>
    )
}

export default ContainerImage