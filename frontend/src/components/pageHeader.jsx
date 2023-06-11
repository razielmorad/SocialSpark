const PageHeader = ({title,description}) => {
    return(
        <>
         <div className="row mt-2">
        <div className="col-12 mt-4 justify-content-center">
          <h1>{title}</h1>
        </div>
      </div>
      {description && (
        <div className="row">
          <div className="col-12 mt-4 mx-2">
            <p>{description}</p>
          </div>
        </div>
      )}
        </>
    )
};
export default PageHeader;
