export const generateDynamic = (modelName: string, upperCaseFirstLetterModelName: string, finalSchemaItemsForDynamicPage: string) => {

    const dynamicPage = `
    import Link from 'next/link'
  import { useRouter } from "next/router";
  
  export default function ${upperCaseFirstLetterModelName}Details(props) {
    // router object from next
    const router = useRouter();
  
    const ${modelName} = props.${modelName}
  
    return (
      <div>
        <div>
          <div>
            <form >
              <div>
                <h3>Show ${upperCaseFirstLetterModelName}</h3>
              </div>
  
              <div>
                ${finalSchemaItemsForDynamicPage}
                <div>
                  <div>
                    <button
                      onClick={() => router.back()}
                      type="button"
                    >
                      Back
                    </button>
                    <Link href={"/${modelName}s/edit${upperCaseFirstLetterModelName}s/" + ${modelName}._id}>
                      <a>
                        Edit
                      </a>
                    </Link>
                  </div>
                </div>
  
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  
  export const getServerSideProps = async (context) => {
    // fetch ${modelName} data from api here
    const ${modelName}Id = context.params.${modelName}Id;
    const res = await fetch(\`\${process.env.NEXT_PUBLIC_HOST_URL}/api/${modelName}s/\${${modelName}Id}\`, {
      method: "GET"
    });
  
    const data = await res.json();
  
    if (!data) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        ${modelName}: data.${modelName},
      },
    };
  };
    `
  
    return dynamicPage
  }