import { Row, Typography } from 'antd';
import ReactLinkify from 'react-linkify';
import WORD from '../../../resources/file/word.svg'
import EXCEL from '../../../resources/file/excel.svg'
import PDF from '../../../resources/file/pdf.png'
import PPTX from '../../../resources/file/pptx.png'
import ZIP from '../../../resources/file/zip.png'
import TXT from '../../../resources/file/txt.png'
import UNKNOWN from '../../../resources/file/unknown.png'
import filesize from "filesize";
interface Props {
	isFile: boolean;
	content: string;
    fileSize?: number;
}
function ChatContent(props: Props) {
	const { content, isFile, fileSize } = props;
    
    const fileIcon = () => {
        const ext = content.split('.').pop()?.toLocaleLowerCase();
        if(!ext) return WORD;
        switch(ext) {
            case 'txt':
                return TXT;
            case 'doc':
            case 'docx':
                return WORD;
            case 'xls':
            case 'xlsx':
                return EXCEL
            case 'pdf':
                return PDF;
            case 'ppt':
            case 'pptx':
                return PPTX;
            case 'zip':
            case 'rar':
            case '7z':
                return ZIP;
            default:
                return UNKNOWN;
        }
    }
	const renderContent = () => {
		if (isFile) {
			return (
				<Row align='middle'>
					<img src={fileIcon()} alt='file-icon' style={{width: '2rem', height: '2rem', marginRight: '.4rem'}}/>
					<div>
                    <Row>
                    <Typography.Link ellipsis>{content}</Typography.Link>
                    </Row>
						<Row>
                            <Typography.Text type='secondary' className='text-small'>{filesize(fileSize ?? 0)}</Typography.Text>
                        </Row>
					</div>
				</Row>
			);
		}
		return (
			<ReactLinkify>
				<Typography.Text
					className='text-primary'
					style={{
						whiteSpace: 'pre-wrap',
						direction: 'ltr',
					}}
				>
					{content}
				</Typography.Text>
			</ReactLinkify>
		);
	};
	return <Row>{renderContent()}</Row>;
}
export default ChatContent;
