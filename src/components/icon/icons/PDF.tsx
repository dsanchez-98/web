import React, { FC } from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

interface Props extends Omit<SvgProps, 'd'> {}

const Rocket: FC<Props> = (props) => {
  return (
    <Svg height={24} width={24} color={'black'} {...props} viewBox="0 0 24 24">
      <Path
        d="M8.01527 14.3043C7.10765 14.3043 6.66943 15.4161 7.33295 16.0354L11.3177 19.7544C11.7019 20.113 12.2981 20.113 12.6823 19.7544L16.667 16.0354C17.3305 15.4161 16.8923 14.3043 15.9847 14.3043L8.01527 14.3043Z"
        fill="#2A2D45"
      />
      <Path
        d="M20.8208 3H3.17921C2.86646 3 2.56653 3.12424 2.34538 3.34538C2.12424 3.56653 2 3.86646 2 4.17921L2 10.9286C2 11.2414 2.12424 11.5413 2.34538 11.7625C2.56653 11.9836 2.86646 12.1078 3.17921 12.1078H20.8208C21.1335 12.1078 21.4335 11.9836 21.6546 11.7625C21.8758 11.5413 22 11.2414 22 10.9286V4.17921C22 3.86646 21.8758 3.56653 21.6546 3.34538C21.4335 3.12424 21.1335 3 20.8208 3V3ZM7.8495 7.99612C7.44256 8.29137 6.96202 8.46856 6.46082 8.50815C6.14304 8.52753 5.82437 8.52753 5.50659 8.50815C5.36695 8.50815 5.36695 8.57797 5.36695 8.68658C5.36695 9.346 5.36695 10.0132 5.36695 10.6726C5.36695 10.8278 5.36695 10.8821 5.173 10.8821C4.75407 10.8821 4.32739 10.8821 3.88518 10.8821V10.6726C3.88518 8.66072 3.8826 6.62038 3.87742 4.55159C3.87742 4.39643 3.93173 4.34213 4.07913 4.32661C4.93236 4.20199 5.79818 4.18896 6.65477 4.28782C6.99834 4.33035 7.3318 4.43275 7.64003 4.59038C7.96858 4.75726 8.23828 5.02057 8.41299 5.34503C8.5877 5.66948 8.65907 6.03959 8.61753 6.40574C8.62086 6.71211 8.55326 7.0151 8.42002 7.291C8.28678 7.5669 8.09152 7.80824 7.8495 7.99612ZM14.9325 9.346C14.716 9.70496 14.4279 10.0155 14.0863 10.2584C13.7446 10.5013 13.3566 10.6714 12.9465 10.758C11.8954 10.9615 10.8177 10.9877 9.75795 10.8355C9.63382 10.8355 9.61055 10.758 9.61831 10.6493V7.54616C9.61831 6.52987 9.61831 5.52133 9.61831 4.5128C9.61831 4.35764 9.6571 4.29558 9.82001 4.28006C10.8318 4.14434 11.8571 4.14434 12.8689 4.28006C13.3448 4.33288 13.8005 4.50205 14.1955 4.77265C14.5906 5.04325 14.913 5.40695 15.1342 5.83165C15.3567 6.28273 15.4709 6.77945 15.4678 7.28239C15.4934 8.00763 15.3074 8.72465 14.9325 9.346ZM20.4407 5.36618C20.4407 5.40496 20.3398 5.45927 20.2777 5.45927H18.0434C17.9348 5.45927 17.9038 5.45927 17.9038 5.59891C17.9038 6.00233 17.9038 6.37471 17.9038 6.8014C17.9038 6.93328 17.9426 6.97207 18.0745 6.97207H20.2777C20.2777 7.36773 20.2777 7.74787 20.2777 8.11249C20.2777 8.11249 20.1691 8.18231 20.1148 8.19007H18.1521C17.9038 8.19007 17.9038 8.19007 17.9038 8.43832C17.9038 9.21412 17.9038 9.92009 17.9038 10.6571C17.9038 10.8045 17.9038 10.8588 17.7254 10.851H16.5617C16.4686 10.851 16.4065 10.851 16.4065 10.7192V4.31885C16.4047 4.29821 16.4047 4.27744 16.4065 4.25679H20.4329C20.4484 4.62917 20.4562 5.00155 20.4407 5.36618Z"
        fill="#2A2D45"
      />
      <Path
        d="M11.0784 7.57704C11.0784 6.91762 11.0784 6.25819 11.0784 5.60652C11.0784 5.47464 11.1172 5.41257 11.249 5.39706C11.5879 5.33457 11.9359 5.34154 12.2719 5.41756C12.608 5.49357 12.9251 5.63704 13.204 5.83926C13.5345 6.12064 13.7453 6.51734 13.7937 6.94865C13.883 7.44235 13.8538 7.95024 13.7083 8.43042C13.6055 8.78909 13.3948 9.10738 13.1046 9.34198C12.8145 9.57658 12.4591 9.71608 12.0869 9.74151C11.813 9.75699 11.5385 9.75699 11.2646 9.74151C11.1249 9.74151 11.0784 9.6872 11.0784 9.5398C11.0861 8.90365 11.0784 8.24422 11.0784 7.57704Z"
        fill="#2A2D45"
      />
      <Path
        d="M5.36784 6.38283C5.36784 6.10354 5.36784 5.83201 5.36784 5.55273C5.36784 5.49842 5.43766 5.39757 5.47645 5.38981C5.81606 5.31261 6.16866 5.31261 6.50826 5.38981C6.68878 5.43997 6.84826 5.54714 6.9629 5.69533C7.07755 5.84353 7.14121 6.02482 7.14441 6.21215C7.16602 6.4182 7.12314 6.62588 7.0217 6.80652C6.92026 6.98717 6.76526 7.13188 6.57808 7.22069C6.23222 7.3638 5.85244 7.4042 5.48421 7.33705C5.39111 7.33705 5.36008 7.28275 5.36784 7.18965V6.38283Z"
        fill="#2A2D45"
      />
    </Svg>
  )
}

export default Rocket
