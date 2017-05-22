export interface ApiResponseConfigInterfaced {
    success?: (responseJson: any) => void;
    error?: (responseJson: any) => void;
    finally?: () => void;
}