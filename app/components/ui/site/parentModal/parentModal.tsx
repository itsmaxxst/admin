"use client"
import {  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Autocomplete, AutocompleteItem, Input} from "@nextui-org/react";
export default function ParentModal({ onClose }: { onClose: () => void }){
    return (
        <Modal style={{width:'32,5rem', height:'39,6875rem'}} backdrop={"opaque"} isOpen={true} onClose={onClose}>
            <ModalContent>
                <ModalHeader style={{color:'black', fontSize:'36px', fontWeight:'700', textTransform:'uppercase', textAlign:'left', marginTop:'4.5rem'}}>Батьківський <br/>контроль</ModalHeader>
                <ModalBody style={{gap:'2.5rem'}}>
                    <p style={{color:'black', fontSize:'18px', fontWeight:'400', textAlign:'left'}}>Батьківський контроль дозволяє налаштовувати<br/>
                        доступ до контенту, обмежувати неприйнятні <br/>
                        матеріали та контролювати час онлайн.
                    </p>
                    <div style={{display:'flex', flexDirection:'column', width:'100%', gap:'1rem'}}>
                        <div style={{display:'flex', flexDirection:'row', width:'100%', gap:'2rem', justifyContent:'space-between'}}>
                            <div style={{textAlign:'left', color:'black', fontSize:'16px', fontWeight:'600', textTransform:'uppercase'}}>
                                оберіть вікове<br/>обмеження
                            </div>
                            <div style={{textAlign:'left', color:'black', fontSize:'16px', fontWeight:'600', textTransform:'uppercase'}}>
                                PIN-Код
                            </div>
                        </div>
                        <div style={{display:'flex', flexDirection:'row', width:'100%', gap:'2rem'}}>
                            <div style={{display:'flex', width:'60%'}}>
                                <Autocomplete isRequired defaultSelectedKey="parent">
                                    <AutocompleteItem key={"parent"}>
                                        Я дорослий
                                    </AutocompleteItem>
                                    <AutocompleteItem key={"child"}>
                                        Я дитина
                                    </AutocompleteItem>
                                </Autocomplete>
                            </div>
                            <div style={{display:'flex', width:'40%'}}>
                                <Input type={"password"}></Input>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter style={{marginTop:'4.875rem', alignItems:'center', display:'flex', justifyContent:'center'}}>
                    <Button style={{width:'21.625rem', height:'4rem', borderRadius:'10px',backgroundColor:'#E1F266' ,color:'black', fontWeight:'700', fontSize:'20px', textAlign:'center'}}>
                        Зберегти
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}