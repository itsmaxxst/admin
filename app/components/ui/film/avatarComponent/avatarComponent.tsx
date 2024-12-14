import {User} from "@nextui-org/react";

interface avatarComponentProps {
    name: string;
}
export default function AvatarComponent({name}:avatarComponentProps) {
    return(
        <User style={{color:"#D9D9D9", fontFamily:"Manrope, sans-serif", fontWeight:'600', fontSize:'13px'}} name={name} avatarProps={{radius:"sm", style:{height:'54px', width:'54px'} ,src:"https://s3-alpha-sig.figma.com/img/c5f1/6715/f6a347c3b10dea7e6d3de9622fb1c450?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hqKqTX1E26gamuyFv4-LtjHB5oUR-pWntr8f~1-qpsUEdKWLY4a3egkr9r0Ih0rsAEDJzKnbKFthpyVwiru5ZyAK2dz8yzzeG3rqqanA7nbXFnHwbbGlcIpiigoiaHSzjy~rQNNQ1iV1sV-4yBFYs-JmdPvoq-18zkBv4WCv2uK~l2ILeZctZqY3dsRsfN3mObBJR8AopxccD3PPBvfwAHev-yHANqxklEhS-A9MAnMVjsgQbErTntMQI8qBtrRtq3qbaVfQUOuSnEGPTPj7cUFBolOWlqWJKQML7daSxTJ69d6hIVcAxykv83AD2yMy2dvQkV8TuuCMHTHQU4SHIQ__"}}></User>
    )
}