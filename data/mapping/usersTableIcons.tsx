import {IconTooltip} from "@/app/components/ui/dashboard/tableTemplate/tableTemplate"
import ViewParentComponent from "@/app/components/ui/dashboard/viewModal/parent/viewParentComponent";
import EditParentComponent from "@/app/components/ui/dashboard/editModal/parent/editParentComponent";
import DeleteParentComponent from "@/app/components/ui/dashboard/deleteModal/parent/deleteParentComponent";

const Icons: IconTooltip[] = [
            {
                tooltipContent:"Details",
                icon: <ViewParentComponent />,
            },
            {
                tooltipContent:"Edit",
                icon: <EditParentComponent />,
            },
            {
                tooltipContent:"Delete",
                icon: <DeleteParentComponent />,
            },
]

export default Icons;