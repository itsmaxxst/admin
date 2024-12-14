"use client"
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Textarea,
    Switch,
    DatePicker,
    Select,
    SelectItem,
    Autocomplete,
    AutocompleteItem
} from "@nextui-org/react";
import styles from "@/app/admin/dashboard/films/add/add.module.css";
export default function AddPage(){
    return (
        <div style={{paddingTop: '1rem', display: 'flex', flexDirection: 'row', width: '100%'}}>
            <div style={{width: '70%', paddingRight: '0.5rem'}}>
                <Card style={{backgroundColor:'var(--bgSoft)'}}>
                    <CardHeader style={{color:'var(--text)', fontSize:'18px'}}>
                        Додавання фільму
                    </CardHeader>
                    <CardBody>
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                            <div style={{width: '50%', padding: '0.5rem'}}>
                                <Input label={"Назва"} type={"text"} isRequired={true} size={"sm"} classNames={{inputWrapper: styles.input}}/>
                            </div>
                            <div style={{width: '50%', padding: '0.5rem'}}>
                                <Input label={"Slug"} type={"text"} isDisabled={true} size={"sm"}/>
                            </div>
                        </div>
                        <div style={{width: '100%', padding: '0.5rem'}}>
                            <Textarea label={"Опис"} type={"text"} isRequired={true} classNames={{inputWrapper: styles.input}} />
                        </div>
                    </CardBody>
                </Card>
                <Card style={{backgroundColor:'var(--bgSoft)', marginTop:'1rem'}}>
                    <CardBody>
                        <p style={{color: 'var(--text)'}}>Додавання головного банеру</p>
                        <div style={{marginTop: '1rem'}}>
                            <Input type={"file"} isRequired={true} size={"sm"}/>
                        </div>
                        <p style={{color: 'var(--text)', marginTop: '1rem'}}>Додавання назви</p>
                        <div style={{marginTop: '1rem'}}>
                            <Input type={"file"} isRequired={true} size={"sm"}/>
                        </div>
                        <p style={{color: 'var(--text)', marginTop: '1rem'}}>Додавання обкладинки</p>
                        <div style={{marginTop: '1rem'}}>
                            <Input type={"file"} isRequired={true} size={"sm"}/>
                        </div>
                        <p style={{color: 'var(--text)', marginTop: '1rem'}}>Додавання бонусного контенту</p>
                        <div style={{marginTop: '1rem'}}>
                            <Input type={"file"} isRequired={false} multiple={true} size={"sm"}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div style={{width: '30%', paddingLeft: '0.5rem'}}>
                <Card style={{backgroundColor: 'var(--bgSoft)'}}>
                    <CardBody>
                        <div style={{display:'flex', flexDirection: 'column', gap: '1rem'}}>
                            <p style={{color: 'var(--text)'}}>Статус</p>
                            <Switch defaultSelected><p style={{color: 'var(--text)'}}>Видимий</p></Switch>
                        </div>
                        <div style={{flexDirection: 'column', width: '100%', marginTop: '2rem', gap: '1rem'}}>
                            <p style={{color:'var(--text)'}}>Доступно з:</p>
                            <div style={{marginTop: '1rem'}}>
                                <DatePicker classNames={{inputWrapper:styles.date}} />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card style={{backgroundColor:'var(--bgSoft)', marginTop:'1rem'}}>
                    <CardBody>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <p style={{color: 'var(--text)'}}>Жанри</p>
                            <Select isRequired={true} style={{marginTop: '1rem'}} placeholder={"Виберіть жанри"} selectionMode={"multiple"} classNames={{trigger:styles.input, popoverContent:styles.input}}>
                                <SelectItem key={"1"}>1</SelectItem>
                                <SelectItem key={"2"}>2</SelectItem>
                                <SelectItem key={"3"}>3</SelectItem>
                            </Select>
                            <p style={{color: 'var(--text)', marginTop:'1rem'}}>Країни</p>
                            <div style={{marginTop: '1rem'}}>
                                <Autocomplete isRequired={true} placeholder={"Виберіть країни"} classNames={{popoverContent:styles.input}}>
                                    <AutocompleteItem key={"1"}>1</AutocompleteItem>
                                    <AutocompleteItem key={"2"}>2</AutocompleteItem>
                                    <AutocompleteItem key={"3"}>3</AutocompleteItem>
                                </Autocomplete>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card style={{backgroundColor:'var(--bgSoft)', marginTop:'1rem'}}>
                    <CardBody>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <p style={{color: 'var(--text)'}}>Рік випуску</p>
                            <div style={{marginTop: '1rem'}}>
                                <Input label={"Рік"} type={"text"} isRequired={true} size={"sm"} classNames={{inputWrapper:styles.input}}/>
                            </div>
                            <p style={{color: 'var(--text)', marginTop: '1rem'}}>Актори</p>
                            <div style={{marginTop: '1rem'}}>
                                <Autocomplete isRequired={true} placeholder={"Виберіть акторів"} classNames={{popoverContent:styles.input}}>
                                    <AutocompleteItem key={"1"}>1</AutocompleteItem>
                                    <AutocompleteItem key={"2"}>2</AutocompleteItem>
                                    <AutocompleteItem key={"3"}>3</AutocompleteItem>
                                </Autocomplete>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}