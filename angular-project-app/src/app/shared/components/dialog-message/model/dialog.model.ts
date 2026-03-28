export interface Dialog {
  open: boolean;
  data: DataDialog;
}

interface DataDialog {
  status: number | string;
  message: string;
}
