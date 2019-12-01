import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  notificationBlock: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: theme.spacing(3, 2),
  },
  notificationFirst: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: theme.spacing(3, 2),
    backgroundColor:"#ECD44D",
    color: "white",
  },
  notificationSecond: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    backgroundColor:"#FFAE00",
    padding: theme.spacing(3, 2),
    color: "white",
  },
  notificationThird: {
    display: "block",
    width: "100%",
    backgroundColor:"#FF2828",
    marginBottom: "10px",
    color: "white",
    padding: theme.spacing(3, 2),
  },
  visitsNumberContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: theme.spacing(1),
  },
  progressSection: {
    marginBottom: theme.spacing(1),
  },
  progressTitle: {
    marginBottom: theme.spacing(2),
  },
  progress: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  pieChartLegendWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: theme.spacing(1),
  },
  legendItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  fullHeightBody: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tableWidget: {
    overflowX: "auto",
  },
  progressBar: {
    backgroundColor: theme.palette.warning.main,
  },
  performanceLegendWrapper: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  legendElement: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  legendElementText: {
    marginLeft: theme.spacing(1),
  },
  serverOverviewElement: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
  },
  serverOverviewElementText: {
    minWidth: 145,
    paddingRight: theme.spacing(2),
  },
  serverOverviewElementChartWrapper: {
    width: "100%",
  },
  mainChartBody: {
    overflowX: "auto",
  },
  mainChartHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap",
    },
  },
  mainChartHeaderLabels: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      order: 3,
      width: "100%",
      justifyContent: "center",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  mainChartHeaderLabel: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(3),
  },
  mainChartSelectRoot: {
    borderColor: theme.palette.text.hint + "80 !important",
  },
  mainChartSelect: {
    padding: 10,
    paddingRight: 25,
  },
  mainChartLegentElement: {
    fontSize: "18px !important",
    marginLeft: theme.spacing(1),
  },
  formGrid: {
    width: "80%",
    margin: "auto",
  },
  mainFormTable: {
    width: "100%",
    display: "table",
    padding: "10px",
  },
  mainFormBody: {
    width: "100%",
  },
  mainFormRow: {
    width: "100%",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap",
    },
    marginTop: "20px",
    marginBottom: "20px",
  },
  mainFormItem: {
    display: "block",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));
