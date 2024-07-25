import PenOutline from "@/public/svg/pen-outline.svg";
import XMark from "@/public/svg/x-mark.svg";
import Calendar from "@/public/svg/calendar.svg";
import MapPin from "@/public/svg/map-pin.svg";
import Identification from "@/public/svg/identification.svg";
import Mail from "@/public/svg/mail.svg";
import Telegram from "@/public/svg/telegram.svg";
import Camera from "@/public/svg/camera.svg";
import BigPen from "@/public/svg/big-pen.svg";
import Phone from "@/public/svg/phone.svg";
import { SVGProps } from "react";

export const icons = {
  penOutline: (props?: SVGProps<SVGSVGElement>) => <PenOutline {...props} />,
  xMark: (props?: SVGProps<SVGSVGElement>) => <XMark {...props} />,
  calendar: (props?: SVGProps<SVGSVGElement>) => <Calendar {...props} />,
  bigPen: (props?: SVGProps<SVGSVGElement>) => <BigPen {...props} />,
  mapPin: (props?: SVGProps<SVGSVGElement>) => <MapPin {...props} />,
  identification: (props?: SVGProps<SVGSVGElement>) => (
    <Identification {...props} />
  ),
  telegram: (props?: SVGProps<SVGSVGElement>) => <Telegram {...props} />,
  mail: (props?: SVGProps<SVGSVGElement>) => <Mail {...props} />,
  camera: (props?: SVGProps<SVGSVGElement>) => <Camera {...props} />,
  phone: (props?: SVGProps<SVGSVGElement>) => <Phone {...props} />,
};
