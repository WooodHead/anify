import { isPresent } from 'utils'
import { InputLeftElement, InputGroup, Input } from '@chakra-ui/react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { OperationVariables, QueryResult } from '@apollo/client'
import tw from 'twin.macro'
import { HiSearch, HiInbox } from 'react-icons/hi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Spinner } from 'elements'
import { useTheme } from 'next-themes'
import SearchItem from './SearchItem'

type DesktopSearchModalProps = {
  onClose: () => void
  searchTerm: string
  onSearchTermChange: (value: string) => void
  searchQuery: QueryResult<
    {
      searchAnime: Query['searchAnime']
    },
    OperationVariables
  >
  onPaginate: () => void
}

const DesktopSearchModal = ({
  onClose,
  searchTerm: clientSearchTerm,
  onSearchTermChange,
  searchQuery,
  onPaginate,
}: DesktopSearchModalProps) => {
  const { resolvedTheme } = useTheme()
  const [sentryRef] = useInfiniteScroll({
    loading: searchQuery.loading,
    hasNextPage: searchQuery.data?.searchAnime.hasNextPage || false,
    onLoadMore: onPaginate,
  })

  return (
    <Modal onClick={onClose}>
      <Scroll
        className={
          resolvedTheme === 'dark' ? 'os-theme-light' : 'os-theme-dark'
        }
        options={{
          scrollbars: { autoHide: 'scroll' },
        }}
      >
        <ModalContent>
          <SearchInputGroup>
            <InputLeftElement pointerEvents="none">
              <ModalSearchIcon />
            </InputLeftElement>
            <SearchInput
              onClick={(e) => e.stopPropagation()}
              size="lg"
              placeholder="Search anime"
              value={clientSearchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              focusBorderColor={
                resolvedTheme === 'dark' ? 'green.200' : 'green.500'
              }
              variant="flushed"
              textColor={resolvedTheme === 'dark' ? 'gray.700' : 'gray.400'}
              borderColor={resolvedTheme === 'dark' ? 'gray.700' : 'gray.400'}
              autoFocus
            />
          </SearchInputGroup>
          <Grid>
            {searchQuery.data?.searchAnime.hits
              .filter(isPresent)
              .map((anime) => {
                return <SearchItem key={anime.slug} anime={anime} />
              })}
          </Grid>

          {/* show empty when no results exist */}
          {searchQuery.data?.searchAnime.hits.length === 0 ? (
            <EmptyContainer>
              <EmptyIcon size="36px" />
              <p>No results found</p>
            </EmptyContainer>
          ) : null}

          {/* show loading icon when paginating more */}
          {searchQuery.loading || searchQuery.data?.searchAnime.hasNextPage ? (
            <LoadingPaginationContainer ref={sentryRef}>
              <Spinner />
            </LoadingPaginationContainer>
          ) : null}
        </ModalContent>
      </Scroll>
    </Modal>
  )
}

export default DesktopSearchModal

const Modal = tw.div`absolute hidden md:block top-0 left-0 bg-black bg-opacity-70! dark:bg-opacity-90! z-50`

const Scroll = tw(
  OverlayScrollbarsComponent,
)`pt-32 px-8 w-screen h-screen overflow-hidden!`

const ModalContent = tw.div`flex flex-col items-center pb-8`

const SearchInputGroup = tw(InputGroup)`w-full md:w-2/3! xl:w-1/2! `

const SearchInput = tw(
  Input,
)`text-white! dark:text-white! mb-20 placeholder-white! dark:placeholder-gray-400!`

const ModalSearchIcon = tw(
  HiSearch,
)`w-5 h-5 mt-1.5 text-gray-400 dark:text-gray-700`

const EmptyContainer = tw.div`flex items-center flex-col opacity-50 text-white`

const EmptyIcon = tw(HiInbox)`mb-2 text-white`

const LoadingPaginationContainer = tw.div`mt-10`

const Grid = tw.div`grid grid-cols-1 lg:grid-cols-2 gap-6 w-full xl:w-3/4`
